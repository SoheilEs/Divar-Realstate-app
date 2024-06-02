const { Schema, models, model, Types } = require("mongoose");

const adsSchema = new Schema({
    title: {type:String, required:true},
    content:{type:String, required:true},
    amount:{type:Number, required:true, default:0},
    category:{
        type:Types.ObjectId,
        ref:"Category",
        required:true,
    },
    province:{type:String,required:true},
    city:{type:String,required:true},
    district:{type:String,required:true},
    address:{type:String,required:true},
    coordinate:{type: [String],required:true}, // 52.32432432, 52.2345654
    images: {type:[String], required:false, default:[]},
    options: {type:Object,default:[]},
    userId:{
        type: Schema.Types.ObjectId,
        ref : "User"
    },
},{timestamps:true})


const adsModel = models.Ads || model("Ads",adsSchema)

module.exports = adsModel
