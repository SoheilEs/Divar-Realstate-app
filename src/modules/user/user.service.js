const autoBind = require("auto-bind");
const UserModel = require("../models/user.model");
const createHttpError = require("http-errors");
const userMessage = require("../../messages/user.messages");
const AuthorizationMessage = require("../../messages/auth.message");
const { Types, isValidObjectId } = require("mongoose");

class UserService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }

  async getAllUsers(user){
    const {role,_id:id} = user
    if(!isValidObjectId(id)) throw new createHttpError.NotFound(AuthorizationMessage.NotFoundAccount)
    const userInfo = await this.#model.findById({_id:id})
    if(!userInfo) throw new createHttpError.NotFound(AuthorizationMessage.NotFoundAccount)
    if((role && userInfo.role) !== "ADMIN") throw new createHttpError.Unauthorized(AuthorizationMessage.UnAuthorized)
    return await this.#model.find({},{otp:0,accessToken:0,__v:0,updatedAt:0})
  }
}

module.exports = new UserService();
