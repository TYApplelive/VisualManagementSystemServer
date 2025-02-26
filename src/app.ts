//. Express 入口
import "tsconfig-paths/register"
import express from "express"
import cors from "cors"
// . 路由 引入
import indexRouter from "@/router/routes/website"
import mongodbRouter from "@/router/routes/mongodb"
import monitorRouter from "@/router/routes/monitor"

//. Socket服务器
import * as server from "@/api/monitor"

const app = express()

app.use(express.static("public")) // 静态资源
app.use(cors()) // 允许跨域请求
app.use(express.json()) // 解析Json请求体
app.use(express.urlencoded({ extended: true })) // 解析urlencoded请求体

// 路由处理中间件
app.use("/", indexRouter) // 网站路由
app.use("/mongodb", mongodbRouter) // 数据库路由
app.use("/monitor", monitorRouter) // 监控路由

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
        result: false,
        error: err
    })
})

// 开启mqtt客户端
server.mqtt.connectMqttClient("test")

// 开启Express监听
const PORT = process.env.PORT || 2007
app.listen(PORT, () => {
    console.log(`Express 服务器:http://127.0.0.1:${PORT}`)
})
