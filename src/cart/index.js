import makeCartList from './cart-list';
import makeCartEndPointHandler from './cart-endpoint';

const cartList = makeCartList();
const cartEndPointHandler = makeCartEndPointHandler({
    cartList
});

export default cartEndPointHandler;
