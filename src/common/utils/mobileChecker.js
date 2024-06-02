const moblePattern = /^(0)?9\d{9}/
const checkMobile = (mobile)=>{
    return moblePattern.test(mobile);
     
}

module.exports = checkMobile