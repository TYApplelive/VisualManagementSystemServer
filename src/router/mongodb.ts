import express from "express"
import * as dbhook from "@/api/mongodb/hooks"
import { type TypeUser, type _weak_TypeUser, UserRole, UserStatus } from "@/api/mongodb/types"

// . 三方库
import moment from "moment"
import { v7 as uuidv7 } from "uuid"

// . 路由返回处理
import { routerResponeHandle } from "@/router/types"

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Mongodb Router!")
})

router.get("/find", async (req, res, next) => {
    try {
        const { account } = req.query

        // 数据检验
        if (account === undefined) {
            throw new Error("查询路由传入参数错误")
        }

        let query = {
            account
        }

        // ! 一定要注意使用await等待函数执行完毕
        const result = await dbhook.findDocuments(query)

        res.send(routerResponeHandle("查询路由执行结果", true, result))
    } catch (error) {
        next(error)
    }
})

router.post("/insert", (req, res) => {
    // userparam 由 前端传入
    const { user } = req.body
    // uuid
    const id = uuidv7()
    // create_date
    const create_time = moment().format("YYYY-MM-DD HH:mm:ss")
    // userparam
    const userparam: TypeUser = {
        ...user,
        create_time,
        id,
        status: UserStatus.Registered,
        role: UserRole.Admin
    }
    dbhook.insertDocuments(userparam)
    res.send("Mongodb Insert Function")
})

router.post("/update", (req, res) => {
    const { findParam, updateParam } = req.body
    const userFindParam: _weak_TypeUser = {
        ...findParam
    }
    const updateParams: _weak_TypeUser = {
        ...updateParam
    }
    dbhook.updateDocuments(userFindParam, updateParams)
    res.send("Mongodb Update Function")
})

router.post("/delete", (req, res) => {
    const { findParam } = req.body
    const userFindParam: _weak_TypeUser = {
        ...findParam
    }
    dbhook.deleteDocuments(userFindParam)
    res.send("Mongodb Delete Function")
})
export default router
