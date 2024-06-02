const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const categoryMessage = require("./category.message");
const {StatusCodes} = require("http-status-codes");
const createHttpError = require("http-errors");
const AuthorizationMessage = require("../../messages/auth.message");
class CategoryController{
    #service
    constructor(){
        autoBind(this)
        this.#service = categoryService
    }

    async create(req,res,next){
        try{
            const user = req.user
            const{name,icon,slug,parent} = req.body

            const category = await this.#service.create({name,icon,slug,parent})
            res.status(StatusCodes.CREATED).json({category,message:categoryMessage.Created})
        }catch(err){
            next(err)
        }
    }
    async list(req,res,next){
        try{
            const categories = await this.#service.list()
            res.status(StatusCodes.OK).json(categories)
        }catch(err){
            console.log(err);
            next(err)
        }
    }
    async categoryDetail(req,res,next){
        try{

            const user = req.user
            if(!user || user.role !== "ADMIN") throw new createHttpError.Unauthorized(AuthorizationMessage.DisAllowed)
            const {id} = req.params
            const category = await this.#service.getCategoryDetail(id)
            res.status(StatusCodes.OK).json({statusCode:200,category})
        }catch(err){
            next(err)
        }
    }
    async removeCategoryById(req,res,next){
        try{
            const {id} = req.params
            await this.#service.removeCategoryById(id)
            res.status(StatusCodes.OK).json({message:categoryMessage.Deleted})
        }catch(err){
            next(err)
        }
    }
}


module.exports = new CategoryController()
