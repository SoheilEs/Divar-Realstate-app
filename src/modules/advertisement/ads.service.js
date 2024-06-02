const autoBind = require("auto-bind");
const CategoryModel = require("../models/category.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const adsMessage = require("./ads.message");
const adsModel = require("../models/ads.model");
const UserModel = require("../models/user.model");


class AdsService {
  #model;
  #categoryModel;
  #user;
  constructor() {
    autoBind(this);
    this.#model = adsModel;
    this.#categoryModel = CategoryModel;
    this.#user = UserModel
  }
  async create(AdsDto) {
   return await this.#model.create(AdsDto)
  }
  async listAds(options){
    let {category, search} = options
    const query = {}
    if(category){
      const result = await this.#categoryModel.findOne({slug: category})
      let categories = await this.#categoryModel.find({parents: result._id},{_id:1})
      categories=categories.map(item=>item._id)
      if(result) {
        query['category'] = {$in:[result._id,...categories]}
      }else{
        return []
      }
    }
    if(search){
      search = new RegExp(search,"ig") 
      console.log(search);
      query['$or'] = [
        {title:search},
        {content:search}
      ]

    }
    return await this.#model.find(query,{userId:0},{sort:{_id:-1}})
  }
 async getAdsByUserId(userInfo){
    const[user] = await this.#user.aggregate([
      {
        $match:{_id:userInfo._id},

      },
      {
        $lookup:{
          from:"ads",
          localField:"_id",
          foreignField:"userId",
          as:"Ads"
        }
      }
    ])
    return user.Ads
 }
 async deleteById(user,id){
    const ads = await this.checkExistsAds(id)
    if(!user._id.equals(ads.userId)) throw new createHttpError[403](adsMessage.LimitedAccess)
    await this.#model.deleteOne({_id:ads._id})
 }
 async adsDetail(id){
    return await this.checkExistsAds(id)
 }
 async checkExistsAds(id){
  const ads = await this.#model.aggregate([
    {
      $match:{_id: new Types.ObjectId(id)}
    },
    {
      $lookup:{
        from:"users",
        localField:"userId",
        foreignField:"_id",
        as: "user"
      }
    },
    {
      $unwind:{
        path:"$user",
        preserveNullAndEmptyArrays:true
      }
    },
    {
      $addFields:{
        userMobile:"$user.mobile"
      }
    },{
      $project:{
        userId:0,
        user:0,
        __v:0
      }
    }
  ])
  if(!id || !isValidObjectId(id)) throw new createHttpError.BadRequest(adsMessage.RequestNotValid)
  if(!ads) throw new createHttpError.NotFound(adsMessage.NotFound)
  return ads
 }
}


module.exports = new AdsService();
