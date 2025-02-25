//. 基本路由
import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello monitor!")
})

router.get("/about", (req, res) => {
    res.send("You Successful to get monitor page")
})

export default router
