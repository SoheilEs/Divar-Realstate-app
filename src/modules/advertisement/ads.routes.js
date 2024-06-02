const {Router} = require("express")
const adsController = require("./ads.controller")
const upload = require("../../common/utils/multer")
const Authorization = require("../../common/guard/authorization.guard")

const router = Router()

router.post("/",Authorization,upload.array("images",10),adsController.create)
router.get("/", adsController.list)
router.get("/user-ads",Authorization,adsController.getUsersAds)
router.delete("/:id",Authorization,adsController.deleteAdsById)
router.get("/:id",adsController.getAdsDetail)
module.exports = {
    AdsRouter : router
}
