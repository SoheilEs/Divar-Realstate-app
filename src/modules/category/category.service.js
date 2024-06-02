const autoBind = require("auto-bind");
const CategoryModel = require("../models/category.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const categoryMessage = require("./category.message");
const { default: slugify } = require("slugify");
const optionModel = require("../models/options.model");

class CategoryService {
  #model;
  #opModel;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
    this.#opModel = optionModel;
  }
  async create(categoryDto) {
   
    const checkExistingCategory = await this.#model.findOne({name:categoryDto.name})
    if(checkExistingCategory)  throw new createHttpError.Conflict(categoryMessage.ExistensCategory)
    if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
      
      const existsCategory = await this.checkCategoryExistById(
        categoryDto.parent
      );
    
      categoryDto.parent = existsCategory._id;
      categoryDto.parents = [
        ...new Set(
          [existsCategory._id.toString()]
            .concat(existsCategory.parents.map((id) => id.toString()))
            .map((id) => new Types.ObjectId(id))
        ),
      ];
    }
    if (categoryDto?.slug) {
      categoryDto.slug = slugify(categoryDto.slug);
      await this.slugAlreadyExists(categoryDto.slug);
    } else {
      categoryDto.slug = slugify(categoryDto.name);
    }
    const category = await this.#model.create(categoryDto);
    return category;
  }
  async list() {
    return await this.#model.find({ parent: { $exists: false } });
  }
  async editCategory(categoryId,data){
    if(!isValidObjectId(categoryId)) throw new createHttpError.NotFound(categoryMessage.NotFound)
    const category = await this.checkCategoryExistById(id)
    const updatedCategory = await this.#model.updateOne({_id:category.id},{data})
    return updatedCategory
  }
  async getCategoryDetail(id){
    if(!isValidObjectId(id)) throw new createHttpError.NotFound(categoryMessage.NotFound)
    return await this.#model.findById({
      _id:id,
  })
  }
  async removeCategoryById(id) {
  
    await this.checkCategoryExistById(id);
    await this.#opModel
      .deleteMany({ category: id })
      .then(async()=> await this.#model.deleteMany({parents:{$in:id}}))
      .then(async()=> await this.#model.deleteOne({_id:id}))
    
      return true
  }
  async checkCategoryExistById(id) {
    const category = await this.#model.findById(id);
    if (!category) throw new createHttpError.NotFound(categoryMessage.NotFound);
    return category;
  }
  async checkExistingSlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (!category) throw new createHttpError.NotFound(categoryMessage.NotFound);
    return category;
  }
  async slugAlreadyExists(slug) {
    const category = await this.#model.findOne({ slug });
    if (category)
      throw new createHttpError.Conflict(categoryMessage.ExistensCategory)
    return null;
  }
}

module.exports = new CategoryService();

