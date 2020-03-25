import makeProductList from './product-list';
import makeCategoryList from '../categories/category-list';
import makeContactsEndpointHandler from './products-endpoint';

const productList = makeProductList();
const categoryList = makeCategoryList();
const productsEndpointHandler = makeContactsEndpointHandler({
    productList,categoryList
});

export default productsEndpointHandler;
