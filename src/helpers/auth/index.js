import initDb from '../database'
import makeUserList from '../../users/users-list'
import makeAuthEndPointHandler from './auth-endpoint'

const database = initDb();
const userList = makeUserList({
    database
});
const authEndpointHandler = makeAuthEndPointHandler({
    userList
});

export default authEndpointHandler