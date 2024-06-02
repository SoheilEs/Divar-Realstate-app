const {Router} = require("express")
const categoryController = require("./category.controller")
const Authorization = require("../../common/guard/authorization.guard")
const router = Router()

router.post("/",Authorization,categoryController.create)
router.get("/",Authorization,categoryController.list)
router.delete("/:id",Authorization,categoryController.removeCategoryById)
router.get("/:id",Authorization,categoryController.categoryDetail)
module.exports = {
    CategoryRouter : router
}
