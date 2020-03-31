import makeOrderList from './order-list';
import makeOrderEndPointHandler from './order-endpoint';
import makeCartList from '../cart/cart-list';
import makeUserList from '../users/user-list';

const orderList = makeOrderList();
const cartList = makeCartList();
const userList = makeUserList();

const orderEndPointHandler = makeOrderEndPointHandler({
    orderList,
    cartList,
    userList
});

export default orderEndPointHandler;
