import makeOrderList from './order-list';
import makeOrderEndPointHandler from './order-endpoint';
import makeCartList from '../cart/cart-list';

const orderList = makeOrderList();
const cartList = makeCartList();
const orderEndPointHandler = makeOrderEndPointHandler({
    orderList,cartList
});

export default orderEndPointHandler;
