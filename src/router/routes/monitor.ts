//. 基本路由
import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello monitor!")
})

router.get("/about", (req, res) => {
    res.send("You Successful to get monitor page")
})

router.get("/start", (req, res) => {
    res.send("开启监控")
    // TODO 监控程序启动
    // TODO 开启MQTT客户端
})

// . 用于获取数据库数据的API
router.get("/getdata", (req, res) => {
    const { limit } = req.params
    console.log(limit)

    // TODO 验证身份
    // 数据库查询数据
})

export default router
