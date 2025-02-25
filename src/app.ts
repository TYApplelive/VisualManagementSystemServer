//. Express 入口
import "tsconfig-paths/register"
import express from "express"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json()) // 解析Json请求体
app.use(express.urlencoded({ extended: true })) // 解析urlencoded请求体
app.use(cors()) // 允许跨域请求

import indexRouter from "@/router"
import mongodbrouter from "@/router/mongodb"
app.use("/", indexRouter)
app.use("/mongodb", mongodbrouter)

app.listen(PORT, () => {
    console.log(`Server is running:http://127.0.0.1:${PORT}`)
})
