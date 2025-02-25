import express from "express"
import { findDocuments } from "@/api/mongodb"
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Mongodb Router!")
})

router.get("/find", (req, res) => {
    findDocuments({})
    res.send("Mongodb Find Function")
})

export default router
