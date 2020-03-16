import makeProductList from './product-list';
import makeContactsEndpointHandler from './products-endpoint';

const productList = makeProductList();
const productsEndpointHandler = makeContactsEndpointHandler({
    productList
});

export default productsEndpointHandler;