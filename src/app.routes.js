const {Router} = require("express")
const { AuthRouter } = require("./modules/auth/auth.routes")
const { UserRouter } = require("./modules/user/user.routes")
const { CategoryRouter } = require("./modules/category/category.routes")
const { OptionRoutes } = require("./modules/options/option.routes")
const {AdsRouter} = require("./modules/advertisement/ads.routes")
const router = Router()


router.use("/auth",AuthRouter)
router.use("/user",UserRouter)
router.use("/category",CategoryRouter)
router.use("/options", OptionRoutes)
router.use("/ads",AdsRouter)
module.exports = router
