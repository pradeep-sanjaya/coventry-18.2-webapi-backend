import makeHttpError from "../validators/http-error";
import hashValidator from '../validators/hash-validator'
import jwtHandler from '../../helpers/validators/token-handler'
import hasher from '../../helpers/hasher'

function response({
    response,
    code
}) {
    return {
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: code,
        data: JSON.stringify({
                response
            }

        )
    };
}
export default function makeAuthEndPointHanlder({
    userList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.path) {
            case "/login":
                return loginUser(
                    httpRequest
                );
            case "/register":
                return registerUser(httpRequest);

            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                });
        }
    };
    //Login single user and return access token
    async function loginUser(httpRequest) {
        let user = await userList.findByUsername({
            "username": httpRequest.body["username"]
        })
        let validPassword = await hashValidator({
            "password": httpRequest.body["password"],
            "hash": user.password
        })

        if (validPassword) {
            let accessToken = await jwtHandler({
                user
            })

            return response({
                "response": {
                    "success": true,
                    "accessToken": accessToken
                },
                "code": 200,
            });
        } else {
            return response({
                "response": {
                    "success": false,
                    "error": "Invalid Credentials"
                },
                "code": 401
            });
        }

    }


    //Register single user and return access token
    async function registerUser(httpRequest) {
        try {
            var user = await userList.add({
                "user": {
                    "username": httpRequest.body["username"],
                    "password": hasher({
                        "password": httpRequest.body["password"],
                    }),
                    "role": httpRequest.body["role"],
                }
            })

            let accessToken = await jwtHandler({
                user
            })

            return response({
                "response": {
                    "success": true,
                    "accessToken": accessToken
                },
                "code": 200,
            });

        } catch (e) {

            return makeHttpError({
                statusCode: 405,
                errorMessage: `${e}.`
            });

        }
    }
}