const autoBind = require("auto-bind");
const adsService = require("./ads.service");
const adsMessage = require("./ads.message");
const {StatusCodes} = require("http-status-codes");
const CategoryModel = require("../models/category.model");
const createHttpError = require("http-errors");
const { Types, isValidObjectId } = require("mongoose");
class AdsController{
    #service
    constructor(){
        autoBind(this)
        this.#service = adsService
    }
    async create(req,res,next){
        try{
            const user = req.user
            if(!user){
                return res.status(StatusCodes.UNAUTHORIZED).json({message:adsMessage.LoginYourAccount})
            }

            const images = req?.files?.map(image => image?.path?.slice(7))
           
            const {title,content,amount,options,coordinate, category,city,province,district,address}= req.body
            const ads = await this.#service.create({
                title,
                content,
                coordinate,
                amount,
                category : new Types.ObjectId(category),
                province,
                city,
                district,
                images,
                address,
                options,
                userId: new Types.ObjectId(user._id)
            })
            return res.status(StatusCodes.CREATED).json({status:201,message:adsMessage.Created})
        }catch(err){
            next(err)
        }
    }
    async list(req,res,next){
        try{
            const query = req.query
            const ads = await this.#service.listAds(query)
            res.status(StatusCodes.OK).json(ads)
        }catch(err){
            next(err)
        }
    }
    async getUsersAds(req,res,next){
        try{
            const user = req.user
            if(!user && !isValidObjectId(user._id)) throw new createHttpError.Unauthorized(adsMessage.LoginYourAccount)
            const ads = await this.#service.getAdsByUserId(user)
            if(ads.length===0) throw new createHttpError.NotFound(adsMessage.NotFound)
            return res.status(StatusCodes.OK).json(ads)

        }catch(err){
            next(err)
        }
    }
    async deleteAdsById(req,res,next){
        try{
            
            const user = req.user
            if(!user && !isValidObjectId(user._id)) throw new createHttpError.Unauthorized(adsMessage.LoginYourAccount)
            const {id} =  req.params
            await this.#service.deleteById(user,id)
            return res.status(StatusCodes.OK).json(adsMessage.Delete)
            
        }catch(err){
            next(err)
        }
    }
    async getAdsDetail(req,res,next){
        try{
            const {id} = req.params
            const ads = await this.#service.adsDetail(id)
            res.status(StatusCodes.OK).json({data:ads})

        }catch(err){
            next(err)
        }   
    }
}


module.exports = new AdsController()