import hashValidator from '../helpers/validators/hash-validator';

import jwtHandler from '../helpers/validators/token-handler';
import hasher from '../helpers/hasher';

import HttpResponseType from '../models/http-response-type';
import sendEmail from '../helpers/mail/mailer';

function objectHandler(data) {
    return {
        headers: { 'Content-Type': 'application/json' },
        data: data
    };
}

export default function makeAuthEndPointHandler({
    userList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.path) {
        case '/login':
            return loginUser(httpRequest);
        case '/register':
            return registerUser(httpRequest);
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
            const body = httpRequest.body;

            if (body) {
                let user = await userList.findByEmail({
                    email: httpRequest.body['email']
                });

                if (user) {
                    validPassword = await hashValidator({
                        password: httpRequest.body['password'],
                        hash: user.password
                    });
                }

                if (validPassword) {
                    let accessToken = await jwtHandler({
                        user
                    });

                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: {
                            accessToken: accessToken
                        },
                        message: 'Login successful'
                    });
                } else {
                    return objectHandler({
                        code: HttpResponseType.NOT_FOUND,
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
        try {
            const body = httpRequest.body;
            if (body) {
                const userObj = {
                    password: hasher({
                        password: body['password'],
                    }),
                    email: body['email'],
                    role: body['role'],
                    gender: body['gender'],
                    firstName: body['firstName'],
                    lastName: body['lastName']
                };

                let user = await userList.addUser(userObj);

                await sendEmail({
                    from: 'web-api@nibm.lk',
                    to: user.email,
                    subject: 'Registration Successful',
                    text: 'Registration successful. Thanks for choosing our store.'
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
                message: error.message
            });
        }
    }
}
