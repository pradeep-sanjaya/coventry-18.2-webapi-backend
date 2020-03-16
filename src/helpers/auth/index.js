import makeUserList from '../../users/users-list';
import makeAuthEndPointHandler from './auth-endpoint';

const userList = makeUserList();
const authEndpointHandler = makeAuthEndPointHandler({
    userList
});

export default authEndpointHandler;
