import initDb from '../helpers/database';
import makeUserList from './users-list';
import makeUsersEndpointHandler from './users-endpoint';

const database =  initDb();
const userList = makeUserList({
    database
});
const usersEndpointHandler = makeUsersEndpointHandler({
    userList
});

export default usersEndpointHandler;