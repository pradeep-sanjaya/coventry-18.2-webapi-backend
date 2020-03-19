import hashValidator from '../helpers/validators/hash-validator';

import jwtHandler from '../helpers/validators/token-handler';
import hasher from '../helpers/hasher';

import HttpResponseType from '../models/http-response-type';
import sendEmail from '../helpers/mail/mailer';
import config from '../config/config';
import { objectHandler } from '../helpers/utilities/normalize-request';

export default function makeAuthEndPointHandler({
    userList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.path) {
        case '/login':
            return loginUser(httpRequest);
        case '/register':
            return registerUser(httpRequest);
        case '/reset-password':
            return sendResetVerification(httpRequest);
        case `/reset-password/${httpRequest.pathParams.resetToken}`:
            return resetPassword(httpRequest);
        default:
            return objectHandler({
                code: HttpResponseType.METHOD_NOT_ALLOWED,
                message: `${httpRequest.method} method not allowed`
            });
        }
    };

    async function loginUser(httpRequest) {
        try {
            let validPassword = false;
            const { email, password } = httpRequest.body;
            if (email) {
                let user = await userList.findByEmail({
                    email
                });

                if (user) {
                    validPassword = await hashValidator({
                        password,
                        hash: user.password
                    });
                }

                if (validPassword) {
                    let accessToken = await jwtHandler(user);
                    const { _id, firstName, lastName } = user;

                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: {
                            _id,
                            firstName,
                            lastName,
                            accessToken
                        },
                        message: 'Login successful'
                    });
                } else {
                    return objectHandler({
                        code: HttpResponseType.FORBIDDEN,
                        message: 'Invalid email or password'
                    });
                }
            } else {
                return objectHandler({
                    code: HttpResponseType.CLIENT_ERROR,
                    message: 'Request body does not contain a body'
                });
            }

        } catch (error) {
            return objectHandler({
                code: HttpResponseType.CLIENT_ERROR,
                message: error.message
            });
        }
    }

    async function registerUser(httpRequest) {
        const { password, email, role, gender, firstName, lastName } = httpRequest.body;
        try {
            if (httpRequest.body) {
                const userObj = {
                    password: hasher({
                        password
                    }),
                    email,
                    role,
                    gender,
                    firstName,
                    lastName
                };

                let user = await userList.addUser(userObj);

                await sendEmail({
                    from: 'web-api@nibm.lk',
                    to: user.email,
                    subject: 'Registration Successful',
                    text: 'Registration successful. Thanks for choosing our store.',
                    html: ''
                });

                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    message: `${user.role} account created successful`
                });
            } else {
                return objectHandler({
                    code: HttpResponseType.CLIENT_ERROR,
                    message: 'Request body does not contain a body'
                });
            }
        } catch (error) {
            return objectHandler({
                code: HttpResponseType.CLIENT_ERROR,
                message: error.code === 11000 ? `User ${firstName} is already exists`: error.message
            });
        }
    }

    async function sendResetVerification(httpRequest) {
        let body = httpRequest.body;

        if (body) {
            const user = body['email'];

            try {
                const profile = await userList.findByEmail(user.email);
                const token = Math.random().toString(36).substring(7);
                const url = `${config.clientHost}/user/auth/reset-password/${token}`;
                if (profile && profile.email) {
                    const email = {
                        to: profile.email,
                        from: config.adminEmail,
                        subject: 'Password Reset Confirmation',
                        text: `Please use below link to reset your password Link - ${url}`,
                        html: ''
                    };

                    try {
                        await sendEmail(email);

                        console.log(token);
                        const data = await userList.updateResetToken({
                            email: profile.email,
                            resetToken: token
                        });

                        if (data.resetToken) {
                            return objectHandler({
                                status: HttpResponseType.SUCCESS,
                                message: `Password reset instructions sent to ${profile.email}`
                            });
                        }
                    } catch (error) {
                        return objectHandler({
                            code: HttpResponseType.INTERNAL_SERVER_ERROR,
                            message: error.message
                        });
                    }
                } else {
                    return objectHandler({
                        code: HttpResponseType.NOT_FOUND,
                        message: 'Email does not exists on database'
                    });
                }
            } catch (error) {
                return objectHandler({
                    code: HttpResponseType.INTERNAL_SERVER_ERROR,
                    message: error.message
                });
            }
        } else {
            return objectHandler({
                code: HttpResponseType.CLIENT_ERROR,
                message: 'Request body does not contain a body'
            });
        }
    }

    async function resetPassword(httpRequest) {
        let body = httpRequest.body;
        let pathParams = httpRequest.pathParams;

        if (body) {
            try {
                let success = await userList.resetPassword({
                    resetToken: pathParams.resetToken,
                    password: body['password']
                });
                if (success) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        message: `Password reset successful for ${pathParams.resetToken}`
                    });
                } else {
                    return objectHandler({
                        status: HttpResponseType.CONFLICT,
                        message: `Password reset failed ${pathParams.resetToken}`
                    });
                }

            } catch (error) {
                return objectHandler({
                    code: HttpResponseType.INTERNAL_SERVER_ERROR,
                    message: error.message
                });
            }
        } else {
            return objectHandler({
                code: HttpResponseType.CLIENT_ERROR,
                message: 'Request body does not contain a body'
            });
        }
    }
}
