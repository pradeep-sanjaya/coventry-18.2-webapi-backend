import makeCategoryList from './category-list';
import makeCategoryEndpointHandler from './categories-endpoint';

const categoryList = makeCategoryList();
const categoryEndpointHandler = makeCategoryEndpointHandler({
    categoryList
});

export default categoryEndpointHandler;