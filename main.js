const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./src/config/mongoose.config")
const swaggerConfig = require("./src/config/swagger.config")
const { catchNotFoundError, catchAllErrors } = require("./src/common/errorHandler")
const allRoutes  = require("./src/app.routes")
const cookieParser = require("cookie-parser")
const cors = require('cors')




dotenv.config()
async function main(){
    const app = express()
    app.use(cors({credentials: true,origin:"http://localhost:3000"}));
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser(process.env.COOKIE_SECRET))
    const port = process.env.PORT
    await connectDB()
    app.use(express.static("public"));
    app.use(allRoutes)
    swaggerConfig(app)
    app.use(catchNotFoundError)
    app.use(catchAllErrors)
    app.listen(port,()=>{
        console.log(`server:http://localhost:${port}`);
    })
}
main()





