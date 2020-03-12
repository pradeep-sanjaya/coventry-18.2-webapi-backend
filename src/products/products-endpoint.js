import makeHttpError from "../helpers/validators/http-error";

export default function makeProductsEndpointHandler({
  productList
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        return postProduct(httpRequest);

      case "GET":
        return getProducts(httpRequest);

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  };

  async function getProducts(httpRequest) {
    const {
      id
    } = httpRequest.pathParams || {}
    const {
      max,
      before,
      after
    } = httpRequest.queryParams || {}

    const result = id ? {
      "product": {
        "id": 1,
        "name": "dildo",
      }
    } : {
      "product": {

        "name": "product found",
      }
    }
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: JSON.stringify({
        result
      })
    };
  }

  async function postProduct(httpRequest) {
    var result = await productList.add({
      "product": httpRequest.body
    })
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        result
      }

    };

  }
}