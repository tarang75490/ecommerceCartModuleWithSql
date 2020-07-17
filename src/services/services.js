// const Cart = require('../models/Cart')

const addProductToCart = (fastify,addProductRequest)=>{
    let fields = ''
    let values = ''
    for(let property in addProductRequest){
        fields += property+','
        values += "'"+addProductRequest[property]+"',"
    }
    console.log(fields,values)
    let sql ="INSERT INTO cart ( "+fields.slice(0,-1)+" ) VALUES ( "+values.slice(0,-1)+" );"
    return sql
    // const cart = await new Cart(addProductRequest).save()
    // return cart
}


// const removeProductFromCart =async (fastify,removeProductRequest) => {

//     const cart = await Cart.findOneAndDelete(removeProductRequest)
//     if(!cart){
//         return {
//             error:"Product Not Found in cart"
//         }
//     }
//     return cart
// }


// const updateProductOfCart = (fastify,updateProductRequest) =>{

//     // let Variants = ["variantIdinfo"]
//     // Variants.forEach(async (variant)=>{
//     //     const varaintsIncart = await Cart.findOneAndUpdate({
//     //         variantId : variant.variantId,
//     //         quantity : variant.quantity
//     //     })
//     // })



// }


// const getProductofCart = async(fastify,getProductRequest) => {
//     console.log(getProductRequest)
//     const products = await Cart.find(getProductRequest)
//     return products
// }



module.exports = {
    addProductToCart,
    // removeProductFromCart,
    // updateProductOfCart,
    // getProductofCart
}