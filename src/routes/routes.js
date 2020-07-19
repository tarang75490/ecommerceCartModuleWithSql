const controllers = require('../controllers/controller')
const validators = require('../validators/validators')

// // Import Swagger documentation
const documentation = require('./documentation/documentServicesApis')
// const db = require('../app.js')
const routes = [
    {
        method: "POST",
        url: "/addProductsToCart",
        handler: controllers.addProduct,
        schema: documentation.addProduct,
        preValidation: validators.validateAddProductRequest
    },
    {
        method: "DELETE",
        url: "/removeProductFromCart",
        handler: controllers.removeProduct,
        schema: documentation.removeProduct,
        preValidation: validators.validateRemoveProductRequest
    },
    {
        method: "DELETE",
        url: "/emptyProductsFromCart",
        handler: controllers.emptyCart,
        schema: documentation.emptyCart,
        preValidation: validators.validateEmptyCartRequest
    },
    {
        method: "GET",
        url: "/getProductsOfCart",
        handler: controllers.getProduct,
        schema: documentation.getProduct,
        preValidation: validators.validateGetCartRequest
    },
    {
        method: "PUT",
        url: "/updateQuantityToBuy",
        handler: controllers.updateQuantityToBuy,
        schema: documentation.updateQuantityToBuy,
        preValidation: validators.validateUpdateQunatityToBuyRequest
    },
    // {
    //     method: "GET",
    //     url: "/updateProductsOfCart",
    //     handler: controllers.updateProduct,
    //     // schema: documentation.updateProduct,O
    //     // preValidation: validators.validateUpdateProductRequest
    // },
    {
  method: 'GET',
  url: '/createdb',
  schema: documentation.createDatabase,   
  handler: controllers.createDatabase
},
{
    method: 'GET',
    url: '/createTable',
    schema: documentation.createTable,   
    handler: controllers.createCartTable
  },

]



module.exports = routes