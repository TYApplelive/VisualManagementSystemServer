//* 本文件用于生成 mongodb 数据库相关函数

import express from "express"
import { UserDBClinet } from "@/api/mongodb/class"
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

        let query = {}
        if (account) {
            query = {
                account
            }
        }
        // ! 一定要注意使用await等待函数执行完毕
        const result = await UserDBClinet.find(query)
        res.send(routerResponeHandle("查询路由执行结果", true, result))
    } catch (error) {
        next(error)
    }
})

router.post("/insert", async (req, res, next) => {
    try {
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
        const result = await UserDBClinet.insert(userparam)
        res.send(routerResponeHandle("插入路由执行结果", true, result))
    } catch (error) {
        next(error)
    }
})

router.post("/update", async (req, res, next) => {
    try {
        const { findParam, updateParam } = req.body
        const userFindParam: _weak_TypeUser = {
            ...findParam
        }
        const updateParams: _weak_TypeUser = {
            ...updateParam
        }
        const result = await UserDBClinet.update(userFindParam, updateParams)
        res.send(routerResponeHandle("更新路由执行结果", true, result))
    } catch (error) {
        next()
    }
})

router.post("/delete", async (req, res, next) => {
    try {
        const { findParam } = req.body
        const userFindParam: _weak_TypeUser = {
            ...findParam
        }
        const result = await UserDBClinet.delete(userFindParam)
        res.send(routerResponeHandle("删除路由执行结果", true, result))
    } catch (error) {
        next()
    }
})
export default router
