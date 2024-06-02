const {Router} = require("express")
const userController = require("./user.controller")
const Authorization = require("../../common/guard/authorization.guard")
const router = Router()
router.get("/",Authorization,userController.listUsers)
router.get("/whoami",Authorization,userController.whoami)
router.get("/logout",Authorization,userController.logout)

module.exports = {UserRouter:router}