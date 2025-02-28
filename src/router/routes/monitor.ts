//. 基本路由
import express from "express"
import * as monitor from "@/api/monitor/hooks"

// . 路由返回处理
import { routerResponeHandle } from "@/router/types"

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
router.get("/db/find", async (req, res, next) => {
    try {
        const { limit, id } = req.query
        console.log(Number(limit), id)
        // TODO 验证身份
        // 数据库查询数据

        if (limit === undefined) {
            throw new Error("查询路由传入参数错误:limit")
        }
        let result = null
        if (id === undefined) {
            console.log("查询全部数据")
            result = await monitor.monitor_find(Number(limit))
        } else {
            console.log("查询指定数据")
            const query = { id }
            console.log(query)

            result = await monitor.monitor_find(Number(limit), query)
        }

        //...
        res.send(routerResponeHandle("查询路由执行结果", true, result))
    } catch (error) {
        next(error)
    }
})

export default router
