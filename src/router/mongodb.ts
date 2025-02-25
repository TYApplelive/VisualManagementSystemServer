import express from "express"
import { findDocuments, insertDocuments } from "@/api/mongodb/hooks"
import { type TypeUser, UserRole, UserStatus } from "@/api/mongodb/types"
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

export default router
