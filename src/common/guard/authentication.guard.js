const createHttpError = require("http-errors")
const AuthorizationMessage = require("../../messages/auth.message")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const UserModel = require("../../modules/models/user.model")
dotenv.config()


const Authentication = async(req,res,next)=>{
    try{
        const token = req?.cookies?.access_token
        if(!token) return next()
        const data = jwt.verify(token,process.env.SECRET_KEY)
        if(typeof data ==="object" && "id" in data){
            const user = await UserModel.findOne({_id:data.id},{accessToken:0,otp:0,"__v": 0,"updatedAt": 0,}).lean()
            if(!user) throw new createHttpError.NotFound(AuthorizationMessage.NotFoundAccount)
            req.user = user
            return next();
        }
      return next()
    }catch(err){
        next(err)
    }
}

module.exports = Authentication