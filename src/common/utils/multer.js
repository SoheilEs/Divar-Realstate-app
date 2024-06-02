const multer = require("multer")
const fs = require("fs")
const path = require("path")
const createHttpError  = require("http-errors")
const storage = multer.diskStorage({
    destination: function(req,file,callBack){
        fs.mkdirSync(path.join(process.cwd(),"public","upload"),{recursive:true})
        callBack(null,"public/upload")
    },
    filename: function(req,file,callBack){
        const whiteListFormat = ["image/png","image/jpg","image/jpeg","image/webp"]
        if(whiteListFormat.includes(file.mimetype)){
            const format = path.extname(file.originalname)
            const filename = new Date().getTime().toString() + format
            callBack(null,filename)
        }else{
            callBack(new createHttpError.BadRequest("format of pictures are wrong!"))
        }
    }
})

const upload = multer({
    storage,
    limits:{
        fileSize: 3 * 1000 * 1000
    }
})

module.exports = upload


