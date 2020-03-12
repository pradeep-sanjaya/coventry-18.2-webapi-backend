import initDb from '../helpers/database'
import makeProductList from './product-list'
import makeContactsEndpointHandler from './products-endpoint'

const database =  initDb()
const productList = makeProductList({
    database
})
const productsEndpointHandler = makeContactsEndpointHandler({
    productList
})

export default productsEndpointHandler