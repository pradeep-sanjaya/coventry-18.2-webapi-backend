import makeCartList from './cart-list';
import makeUserList from '../auth/auth-list';
import makeCartEndPointHandler from './cart-endpoint';
import makeProductList from '../products/product-list';

const cartList = makeCartList();
const userList = makeUserList();
const productList = makeProductList();

const cartEndPointHandler = makeCartEndPointHandler({
    cartList,
    userList,
    productList
});

export default cartEndPointHandler;
