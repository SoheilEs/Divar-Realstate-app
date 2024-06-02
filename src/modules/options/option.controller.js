const autoBind = require("auto-bind");
const optionService = require("./option.service");
const optionMessage = require("./option.message");
const {StatusCodes} = require("http-status-codes")
class OptionController{
    #service
    constructor(){
        autoBind(this)
        this.#service = optionService
    }

    async create(req,res,next){
        try{
           const {title, key, guid, enum:list, category, required,type} = req.body
           const option = await this.#service.create({title, key, guid, enum:list,category, required,type})
           return res.status(StatusCodes.CREATED).json({option, message: optionMessage.Created})
        }catch(err){
            next(err)
        }
    }
    async update(req,res,next){
        try{
            const {id} = req.params
            const {title, key, guid, enum:list, category, required,type} = req.body
            const option = await this.#service.update(id,{title, key, guid, list,category, required, type})
           return res.status(StatusCodes.OK).json({option, message: optionMessage.Updated})
        }catch(err){
            next(err)
        }
    }
    async listAll(req,res,next){
        try{
           const options =  await this.#service.list()
           return res.status(StatusCodes.OK).json(options)
        }catch(err){
            next(err)
        }
    }
    async listByCategoryId(req,res,next){
        try{
         const{categoryId} = req.params
         const option = await this.#service.listByCategoryId(categoryId)
         return res.status(StatusCodes.OK).json(option)

        }catch(err){
            next(err)
        }
    }
    async listBySlug(req,res,next){
        try{
         const{slug} = req.params
         const option = await this.#service.listBySlug(slug)
         return res.status(StatusCodes.OK).json(option)

        }catch(err){
            next(err)
        }
    }
    async listById(req,res,next){
        try{
            const{id} = req.params
            const option = await this.#service.listById(id)
            res.status(StatusCodes.OK).json(option)
        }catch(err){
            next(err)
        }
    }
    async removeById(req,res,next){

        try{
            const remove = await this.#service.removeById(req.params.id)
            res.status(StatusCodes.OK).json(remove)
        }catch(err){
            next(err)
        }
    }
}


module.exports = new OptionController()