const autoBind = require("auto-bind");
const userService = require("./user.service");
const userMessage = require("../../messages/user.messages");
const CookieName = require("../../common/constant/cookie.enum");
const { StatusCodes } = require("http-status-codes");

class UserController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = userService;
  }
  async whoami(req, res, next) {
    try {
      const user = req.user;
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
  async listUsers(req,res,next){
    try{
      const user = req.user
      const allUsers = await this.#service.getAllUsers(user)
      return res.status(StatusCodes.OK).json({status:200, allUsers ,messsage:"success"})
    }catch(err){
      next(err)
    }
  }
  async logout(req, res, next) {
    try {
      return res
        .clearCookie(CookieName.AccessToken)
        .status(200)
        .json(userMessage.Logout);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
