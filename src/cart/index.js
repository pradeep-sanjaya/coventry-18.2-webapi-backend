import makeCartList from './cart-list';
import makeUserList from '../auth/auth-list';
import makeCartEndPointHandler from './cart-endpoint';
import makeProductList from '../products/product-list';
import makeMetaDataList from '../meta-data/meta-data-list';

const cartList = makeCartList();
const userList = makeUserList();
const productList = makeProductList();
const metaDataList = makeMetaDataList();

const cartEndPointHandler = makeCartEndPointHandler({
    cartList,
    userList,
    productList,
    metaDataList
});

export default cartEndPointHandler;
