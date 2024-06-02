const { Schema, models, model } = require("mongoose");
const checkMobile = require("../../common/utils/mobileChecker");


const otpSchema = new Schema({
    code:{type:String,default:undefined},
    expiresIn:{type:Number,default:0}
})

const userSchema = new Schema({
    fullName:{type:String},
    mobile:{
        type:String,
        unique:true, 
        required:true,
        match: /^(0)?9\d{9}/,
    },
    otp:{type:otpSchema},
    verifiedMobile:{type:Boolean,default:false,required:true},
    accessToken:{type:String},
    role: { type: String, default: "USER" },
},{timestamps:true})


const UserModel = models.User || model("User",userSchema)

module.exports = UserModel