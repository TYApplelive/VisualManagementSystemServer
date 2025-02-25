//. Express 入口
import "tsconfig-paths/register"
import express from "express"
import cors from "cors"
// . 路由 引入
import indexRouter from "@/router"
import mongodbrouter from "@/router/mongodb"

const app = express()

app.use(express.static("public")) // 静态资源
app.use(cors()) // 允许跨域请求
app.use(express.json()) // 解析Json请求体
app.use(express.urlencoded({ extended: true })) // 解析urlencoded请求体

// 路由处理中间件
app.use("/", indexRouter)
app.use("/mongodb", mongodbrouter)

// 全局错误中间件
app.use(function (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    res.status(500).json({
        errortip: "路由发生了错误!",
        errormsg: err.message,
        result: false
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running:http://127.0.0.1:${PORT}`)
})
