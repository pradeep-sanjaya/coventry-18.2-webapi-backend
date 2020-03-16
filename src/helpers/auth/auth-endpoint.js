import makeHttpError from '../validators/http-error';
import hashValidator from '../validators/hash-validator';

import jwtHandler from '../../helpers/validators/token-handler';
import hasher from '../../helpers/hasher';

import HttpResponseType from '../../models/http-response-type';
import sendEmail from '../mail/mailer';

import * as statusMapper from '../utilities/http-error-status-mapper';

function response({
    response,
    code
}) {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode: code,
        data: JSON.stringify({
            response
        }
        )
    };
}

export default function makeAuthEndPointHandler({
    userList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.path) {
        case '/login':
            return loginUser(
                httpRequest
            );
        case '/register':
            return registerUser(httpRequest);

        default:
            return makeHttpError({
                statusCode: HttpResponseType.METHOD_NOT_ALLOWED,
                errorMessage: `${httpRequest.method} method not allowed.`
            });
        }
    };

    //Login single user and return access token
    async function loginUser(httpRequest) {
        try {
            let user = await userList.findByUsername({
                'username': httpRequest.body['username']
            });
            let validPassword = await hashValidator({
                'password': httpRequest.body['password'],
                'hash': user.password
            });

            if (validPassword) {
                let accessToken = await jwtHandler({
                    user
                });

                return response({
                    'response': {
                        'success': true,
                        'accessToken': accessToken
                    },
                    'code': HttpResponseType.SUCCESS,
                });
            } else {
                return response({
                    'error': {
                        'code': statusMapper.httpErrorStatusMapper(HttpResponseType.AUTH_REQUIRED),
                        'error': 'Invalid credentials'
                    }
                });
            }
        } catch (error) {
            return makeHttpError({
                statusCode: HttpResponseType.AUTH_REQUIRED,
                errorMessage: error.message
            });
        }
    }

    //Register single user and return access token
    async function registerUser(httpRequest) {
        try {
            let user = await userList.add({
                'user': {
                    'username': httpRequest.body['username'],
                    'password': hasher({
                        'password': httpRequest.body['password'],
                    }),
                    'email': httpRequest.body['email'],
                    'role': httpRequest.body['role'],
                    'contactNumber': httpRequest.body['contactNumber'],
                    'gender': httpRequest.body['gender'],
                    'firstName': httpRequest.body['firstName'],
                    'lastName': httpRequest.body['lastName'],
                    'questionId': httpRequest.body['questionId'],
                    'answer': httpRequest.body['answer']
                }
            });

            let accessToken = await jwtHandler({
                user
            });

            await sendEmail({
                'from': 'web-api@nibm.lk',
                'to': user.email,
                'subject': 'Registration Successful.',
                'text': 'Registration successful. Thanks for choosing our store.'
            });

            return response({
                'response': {
                    'success': true,
                    'accessToken': accessToken
                },
                'code': HttpResponseType.SUCCESS,
            });

        } catch (error) {
            return makeHttpError({
                statusCode: HttpResponseType.METHOD_NOT_ALLOWED,
                errorMessage: error.message
            });
        }
    }
}
