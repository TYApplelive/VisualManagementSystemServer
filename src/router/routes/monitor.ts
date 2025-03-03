//. 基本路由
import express from "express"
import * as monitor from "@/api/monitor/hooks"

// . 路由返回处理
import { routerResponeHandle } from "@/router/types"

//. Redis
import { redisClient } from "@/store/redis"

// . monitor types
import { DeviceType } from "@/api/monitor/types"

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

//. 数据库数据刷新函数 -- redis 缓存策略
//. 由于数据库查询操作，前端方面只需要判断两次查询参数是否相同即可完成对后端查询访问的次数，不需要后端进行redis缓存策略
//. 但是刷新操作，是需要每一次都去访问数据库当前信息，所以刷新操作是一个高频的访问操作，如果数据库没有更改，那么多次的访问必然占用过多的资源
//. 所以，对于刷新操作，使用redis缓存策略，当数据库的数据并未发生更改时，直接读取redis缓存即可
router.get("/db/find", async (req, res, next) => {
    try {
        const { limit, skip, id, address } = req.query
        console.log(Number(limit), Number(skip), id)
        // TODO 验证身份

        console.log("刷新数据API响应")
        // 数据库查询数据
        if (limit === undefined) {
            throw new Error("查询路由传入参数错误:limit")
        }

        // 数据库返回结果
        let mongodbResult = null

        // 生成唯一的缓存键
        const cacheKey = `device_datas:${limit}:${skip ?? 0}:${id || ""}:${address || ""}`
        const redisResult = await redisClient.getKey(cacheKey)

        if (redisResult) {
            mongodbResult = redisResult
            console.log(`缓存key存在 ${cacheKey}`)
        } else {
            console.log(`缓存key不存在 ${cacheKey}`)
            let query_: Record<string, any> = {}
            if (id) query_.id = id
            if (address) query_.address = address

            const query = id || address ? { $and: [query_] } : {}
            console.log(query)

            mongodbResult = await monitor.monitor_find(Number(limit), Number(skip ?? 0), query)
            await redisClient.setKey(cacheKey, mongodbResult, 60) // 缓存 1 分钟
        }

        res.send(routerResponeHandle("查询路由执行结果", true, mongodbResult))
    } catch (error) {
        next(error)
    }
})

router.post("/addDevice", async (req, res, next) => {
    try {
        const datas: DeviceType = { ...req.body }
        let mongodbResult = null
        if (datas) {
            mongodbResult = await monitor.monitor_insert(datas)
        }
        // 清空缓存
        if (mongodbResult?.result) redisClient.clearCache("device_datas:*")
        res.send(routerResponeHandle("查询路由执行结果", true, mongodbResult))
    } catch (error) {
        next(error)
    }
})

export default router
