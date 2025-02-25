import express from "express"
import { findDocuments, insertDocuments, updateDocuments } from "@/api/mongodb/hooks"
import { type TypeUser, type _weak_TypeUser, UserRole, UserStatus } from "@/api/mongodb/types"
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Mongodb Router!")
})

router.get("/find", (req, res) => {
    findDocuments({})
    res.send("Mongodb Find Function")
})

router.post("/insert", (req, res) => {
    // default test data
    const userparam: TypeUser = {
        account: "admin",
        password: "123456",
        user_info: {
            email: "admin@qq.com"
        },
        create_time: "2023-01-01",
        id: "1",
        status: UserStatus.Registered,
        role: UserRole.Admin
    }
    insertDocuments(userparam)
    res.send("Mongodb Insert Function")
})

router.post("/update", (req, res) => {
    // default test data
    const userFindParam: _weak_TypeUser = {
        account: "admin"
    }
    const updateParam: _weak_TypeUser = {
        $set: {
            "user_info.email": "Default@qq.com"
        }
    }
    updateDocuments(userFindParam, updateParam)
    res.send("Mongodb Update Function")
})

export default router
