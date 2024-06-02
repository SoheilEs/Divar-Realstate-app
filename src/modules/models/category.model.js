const { Schema, models, model, Types } = require("mongoose");

const categorySchema = new Schema({
    name:{
        type:String,
        requrired:true
    },
    slug:{
        type:String,
        requrired:true,
        index:true
    },
    icon:{type:String, requrired: true},
    parent:{type:Types.ObjectId,ref:"Category",requrired:false},
    parents:{type:[Types.ObjectId],ref:"Category",requrired:false, default:[]}
},{versionKey:false,id:false,toJSON:{virtuals:true}})

categorySchema.virtual("children",{
    ref:"Category",
    localField:"_id",
    foreignField:"parent"
})
function autoPopulate(next){
    this.populate([{path:"children"}])
    next()
}
categorySchema.pre("find",autoPopulate).pre("findOne",autoPopulate)






const CategoryModel = models.Category || model("Category",categorySchema)

module.exports = CategoryModel