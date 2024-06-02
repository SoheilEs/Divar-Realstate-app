const {Router} = require("express")
const authController = require("./auth.controller")
const Authentication = require("../../common/guard/authentication.guard")


const router = Router()


router.post("/send-otp",authController.sendOTP)
router.post("/check-otp",authController.checkOTP)
module.exports = {AuthRouter:router}