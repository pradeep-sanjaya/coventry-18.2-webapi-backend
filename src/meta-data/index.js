import makeMetaDataList from './meta-data-list';
import makeCartList from '../cart/cart-list';

import makeMetaDataEndpointHandler from './meta-data-endpoint';

const metaDataList = makeMetaDataList();
const cartList = makeCartList();

const metaDataEndpointHandler = makeMetaDataEndpointHandler({
    metaDataList,
    cartList
});

export default metaDataEndpointHandler;
