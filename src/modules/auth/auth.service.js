const autoBind = require("auto-bind")
const UserModel = require("../models/user.model")
const createHttpError = require("http-errors")
const authMessage = require("./auth.messages")
const {randomInt} = require("crypto")
const jwt = require("jsonwebtoken")
const checkMobile = require("../../common/utils/mobileChecker")
const { log } = require("console")



class AuthService {
    #model

    constructor(){
        autoBind(this)
        this.#model = UserModel
    }
    async sendOTP(mobile){
        let mobileNumber = mobile
        if(!checkMobile(mobileNumber)) throw new createHttpError.BadRequest(authMessage.invalidMobile)
        if(mobile[0] !== "0" ) mobileNumber = 0 + mobile
        const user = await this.#model.findOne({mobile:mobileNumber})
        const now = new Date().getTime()
        const otp = {
            code :randomInt(100000,999999),
            expiresIn : now + (1000*30)
        }
        console.log(otp);
        if(!user){
            const newUser= await this.#model.create({
                mobile:mobileNumber,
                otp
            })

            return newUser
        }
        if(user.otp && user.otp.expiresIn > now ){
            throw new createHttpError.Conflict(user.otp.expiresIn - now)
        }
        user.otp = otp
        await user.save()
        return user

    }
    async checkOTP(mobile,code){
        let mobileNumber = mobile
        if(mobile[0] !== "0" ) mobileNumber = 0 + mobile
        const user = await this.checkExsitsByMobile(mobileNumber)
        const now = new Date().getTime()
        if(user?.otp?.expiresIn < now) throw new createHttpError.Unauthorized(authMessage.otpcodeExpired)
        if(user?.otp?.code !== code) throw new createHttpError.Unauthorized(authMessage.invalidOtp)
        if(!user.verifiedMobile) {
        user.verifiedMobile = true
        
    }
        const accessToken = this.signToken({mobileNumber,id:user._id})
    
        user.accessToken = accessToken
        await user.save()
        return accessToken
    
    }
    // async checkRefreshToken(refreshToken){
    //     if(!refreshToken) throw new createHttpError.Unauthorized(AuthorizationMessage.Login)
    //     const data = jwt.verify(refreshToken,process.env.SECRET_KEY)
    //     if(typeof data === "object" && "id" in data){
    //         const user = await this.#model.findById(data.id).lean()
    //         if(!user) throw new createHttpError.Unauthorized(AuthorizationMessage.NotFoundAccount)
    //         const accessToken = this.signToken({mobile:user.mobile,id:user._id})
    //         const refreshToken = this.signToken({
    //             mobile: user.mobile,
    //             id: user._id,
    //           });
    //           await this.#model.updateOne(
    //             {_id:user._id},
    //             {
    //                 $set:{
    //                     accessToken,
    //                     refreshToken
    //                 }
    //             }
    //           );
    //           return {
    //             accessToken,
    //             refreshToken
    //           }
    //     }
    //     throw new createHttpError.Unauthorized
    // }
    async checkExsitsByMobile(mobile){
        const user = await this.#model.findOne({mobile})
        if(!user) throw new createHttpError.NotFound(authMessage.notFound)
        return user

    }

    signToken(payload,expiresIn = new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 12){
        return jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn,
            algorithm:"HS512"
        })
        
    }
}

module.exports = new AuthService()

