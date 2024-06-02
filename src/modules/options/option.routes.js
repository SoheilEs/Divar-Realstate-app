const {Router} = require("express")
const optionController = require("./option.controller")

const router = Router()

router.post("/",optionController.create)
router.delete("/:id",optionController.removeById)
router.get("/by-category/:categoryId",optionController.listByCategoryId)
router.get("/by-slug/:slug",optionController.listBySlug)
router.get("/:id",optionController.listById)
router.get("/",optionController.listAll)
router.put("/:id",optionController.update)
module.exports =  {
    OptionRoutes : router
}
