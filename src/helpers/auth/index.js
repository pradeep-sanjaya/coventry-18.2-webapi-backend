import initDb from '../database'
import makeUserList from '../../users/users-list'
import makeAuthEndPointHanlder from './auth-endpoint'

const database = initDb()
const userList = makeUserList({
    database
})
const authEndpointHandler = makeAuthEndPointHanlder({
    userList
})

export default authEndpointHandler