import makeOrderList from './order-list';
import makeOrderEndPointHandler from './order-endpoint';

const orderList = makeOrderList();
const orderEndPointHandler = makeOrderEndPointHandler({
    orderList
});

export default orderEndPointHandler;
