const service = require('../services/services')

const HttpError = require('../models/errors/httpError')

const db = require('../app.js')

exports.createDatabase = (req,res)=>{
        let sql ='CREATE DATABASE CART'
        db.query(sql,(error,response)=>{
          if(error){
                res.code(400)
                throw new HttpError('faliure', 22005,error)
          } 
          console.log(response)
          return res.status(201).send({
                        status: 'success',
                        message:"Cart Database Created Successfully"
        })
      })
    }
exports.createCartTable = (req,res)=>{
    let sql ='CREATE TABLE cart (customerId VARCHAR(255) ,'+
                                'mainCategory VARCHAR(255) ,'+
                                'subCategory VARCHAR(255) ,'+
                                'productId VARCHAR(255) ,'+
                                'variantId VARCHAR(255) ,'+
                                'productName VARCHAR(255) ,'+
                                'size VARCHAR(255),'+
                                'color VARCHAR(255),'+
                                'price INT(20) NOT NULL,'+
                                'quantity INT(20) NOT NULL,'+
                                "PRIMARY KEY(customerId,variantId))"
        db.query(sql,(error,response)=>{
          if(error){
                res.code(400)
                throw new HttpError('faliure', 22005,error)
          }
          return res.status(201).send({
                        status: 'success',
                        data: response,
                        message:"Carts Table Created Successfully"
        })
      })
}


exports.addProduct=  (req, res) => {
    try {
        let sql =  service.addProductToCart(req.fastify, req.body)
        console.log(sql,123)

        db.query("INSERT INTO cart SET ?",req.body,(error,response)=>{
            if(error){
                  res.code(400)
                  throw new HttpError('faliure', 22005,error)
            }
            console.log("hey")
            return res.status(201).send({
                          status: 'success',
                          data: response,
                          message:"Products Addede to the cart  Successfully"
          })
        })
    } catch (e) {
        res.code(500)
        throw new HttpError('faliure', 2001, "Add Product to Cart Failed", e.message)
    }
}

exports.emptyCart =  (req, res) => {
    try {      
        db.query("DELETE from cart WHERE (customerId) IN (?)",[[[req.query.customerId]]],(error,response)=>{
            if(error){
                  res.code(400)
                  throw new HttpError('faliure', 22005,error)
            }
            console.log("hey")
            return res.status(201).send({
                          status: 'success',
                          data: response,
                          message:"Products Added to the cart Successfully"
          })
        })
    } catch (e) {
        res.code(500)
        throw new HttpError('faliure', 2001, "Empty Cart Failed", e.message)
    }
}






exports.removeProduct = async (req, res) => {
    try {
        console.log(req.body)
        db.query("DELETE from cart WHERE (customerId,variantId) IN (?)",[[[req.body.customerId , req.body.variantId]]],(error,response)=>{
            if(error){
                  res.code(400)
                  throw new HttpError('faliure', 22005,error)
            }
            console.log("hey")
            return res.status(201).send({
                          status: 'success',
                          data: response,
                          message:"Product Removed From the  cart Successfully"
          })
        })
    } catch (e) {
        res.code(500)
        throw new HttpError('faliure', 2001, "Remove Product To cart  Failed", e.message)
    }
}



exports.getProduct= async (req, res) => {
    try {
        db.query(`SELECT * from cart WHERE customerId= "${req.query.customerId}"`,(error,response)=>{
            if(error){
                  res.code(400)
                  throw new HttpError('faliure', 22005,error)
            }
            console.log("hey")
            return res.status(201).send({
                          status: 'success',
                          data: response,
                          message:"Get All Products from  cart Successfully"
          })
        })
    } catch (e) {
        res.code(500)
        throw new HttpError('faliure', 2001, "Get Product from cart Failed", e.message)
    }
}

// var Insta = require('instamojo-nodejs');
// exports.updateProduct = async (req, res) => {
//     try {
//         // let response = await service.updateProductOfCart(req.fastify, req.body)
//         // if(response.error){
//         //     res.code(400)
//         //         throw new HttpError('faliure', 22005,response.error)
//         // }
//         AUTH_KEY = "8b740e19ad633f24b76358dedf5cfddd"
// API_KEY = "967f09caffca2a73babf9e4d4de47fe7"


// Insta.setKeys(API_KEY, AUTH_KEY);


// var data = new Insta.PaymentData();
 
// data.purpose = "Test";            // REQUIRED
// data.amount = 9;                  // REQUIRED
// data.setRedirectUrl("https://localhost:3001//updateProductsOfCart");
 
// Insta.createPayment(data, function(error, response) {
//   if (error) {
//     // some error
//     console.log(error)
//   } else {
//     // Payment redirection link at response.payment_request.longurl
//     console.log(response);
//   }
// });
//         return res.status(200).send({
//             status: 'success',
//             data: response
//         })
//     } catch (e) {
//         res.code(500)
//         throw new HttpError('faliure', 2001, "Update Product to Cart Failed", e.message)
//     }
// }


