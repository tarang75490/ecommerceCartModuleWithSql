const config = require('./config/index')

// Require the framework and instantiate it
const fastify = require('fastify')(
  {
    logger: { level: config.server.logLevel }
  })

// Create Connection
const mysql = require('mysql')
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'your new password',
  insecureAuth : true,
  database:"CART"
});
 

// Register fastify axios
fastify.register(require('fastify-axios'))

// Import Swagger Options
const swagger = require('./config/swagger')

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

// Connect to DB
db.connect((err)=>{
  if(err){
    console.log(err)
  }else {
    console.log("Mysql Connected .....")
  }
})

// fastify.route({
//   method: 'GET',
//   url: '/createdb',
//   schema: {
//   },
//   handler: function (req, res) {
//     let sql ='CREATE DATABASE CART'
//     db.query(sql,(err,response)=>{
//       if(err){
//         console.log(err)
//       }
//       console.log(response)
//       res.send('Database created ...')
//     })
//   }
// })

module.exports = db



// Import Routes
const routes = require('./routes/routes.js')
routes.forEach((route, index) => {
  fastify.route(route)
})

// Import and Register Routes
fastify.decorateRequest('fastify', fastify);

const HttpError = require("./models/errors/httpError")
fastify.setErrorHandler(function (error, request, reply) {
  if (error instanceof HttpError) {
    fastify.log.debug(error)

    if (error.errorCause) {
      reply.send({
        status: error.status, message: error.message,
        code: error.code, errorCause: error.errorCause
      })  
    } else {
      reply.send({
        status: error.status,
        message: error.message, code: error.code
      })
    }
  } else if (error) {
    fastify.log.debug(error)
    
    reply.send({ status: 'faliure', message: error.message, errorCause: "", code: 15000 })
  } else {
    reply.send();
  }
})

// Run the server!
appconfig = config.server
fastify.listen(appconfig.port, function (err, address) {
  if (err) {  
    fastify.log.error(err)
    process.exit(1)
  } else {
    // fastify.swagger()
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  }
});
