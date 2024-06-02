const Kavenegar = require("kavenegar");
var api = Kavenegar.KavenegarApi({
    apikey:
      "5567394A4B6349354D32416D6B46784B6A327275516261695A48655958686F4A70704C45345469695864733D",
  });


  const smsSend = (payload) =>{
    const promise = new Promise((resolve,reject)=>{
        api.VerifyLookup(payload,(response, status, message) => {
            // you can also reject here based on the status.
            resolve({ response, status, message });
        })
    
    })
    return promise
  }

module.exports = smsSend