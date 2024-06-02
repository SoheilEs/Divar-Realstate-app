const autoBind = require("auto-bind");
const authService = require("./auth.service");
const authMessage = require("./auth.messages");
const NodeEnv = require("../../common/constant/env.enum");
const CookieName = require("../../common/constant/cookie.enum");
const { StatusCodes } = require("http-status-codes");


class AuthController {
    #service;
    constructor(){
        autoBind(this)
        this.#service = authService;
    }
    async sendOTP(req,res,next){
        try{
            const user = req.user
            const now = new Date().getTime()
            if(user){
                return res.status(409).json({status:409,message:"you have already logged in"})
            }
            const {mobile} = req.body
            const data= await this.#service.sendOTP(mobile)
            return res.status(200).json({status:200,
                timer:+(data.otp.expiresIn - now),
                message: authMessage.sendOtpSuccessfully
            })
        }catch(err){
            next(err)
        }
    }

    async checkOTP(req,res,next){
        try{
            const user = req.user
            if(user){
                return res.status(409).json({status:409,message:"you have already logged in"})
            }
            const {mobile,code} = req.body
            const token = await this.#service.checkOTP(mobile,code)
           
            return res.cookie(CookieName.AccessToken,token,{
                httpOnly:true,
                secure: process.env.NODE_ENV === NodeEnv.Production,
                maxAge: 60000 * 60 * 24,
            }).status(200).json({
                status:200,
                message: authMessage.loginSuccessfully
            })
        }catch(err){
            next(err)
        }
    }
    async logout(req,res,next){
        try{

        }catch(err){
            next(err)
        }
    }
}

module.exports = new AuthController()