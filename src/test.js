// const axios = require('axios')
// var headers = { 'X-Api-Key': '967f09caffca2a73babf9e4d4de47fe7', 'X-Auth-Token': '8b740e19ad633f24b76358dedf5cfddd',"grant_type": 'client_credentials'}
// var payload = {
//   purpose: 'FIFA 16',
//   amount: parseFloat("10.0"),
//   phone: '9660744867',
//   buyer_name: 'John Doe',
// //   redirect_url: 'http://www.example.com/redirect/',
//   send_email: true,
// //   webhook: 'http://www.example.com/webhook/',
//   send_sms: true,
// //   email: 'foo@example.com',
//   allow_repeated_payments: false}

// axios.post('https://www.instamojo.com/api/1.1/payment-requests/', {params: payload}, { headers: headers}).then((response)=>{
//     console.log(response)
// }).catch((e)=>{


//     console.log(e.response.data.message)
// })
var Insta = require('instamojo-nodejs');

AUTH_KEY = "8b740e19ad633f24b76358dedf5cfddd"
API_KEY = "967f09caffca2a73babf9e4d4de47fe7"


Insta.setKeys(API_KEY, AUTH_KEY);

Insta.getPaymentDetails("PAYMENT-REQUEST-ID", "PAYMENT-ID", function(error, response) {
    if (error) {
      // Some error
    } else {
      console.log(response);
    }
  });



  
