//. 查找功能
import { MongoClient } from "mongodb"
import Mongodb_global from "../global/constant"

//. 数据库返回处理
import { mongodbRespone, mongodbResponeHandle } from "@/api/mongodb/types"

export const findDocuments = async (query: any): Promise<mongodbRespone<any>> => {
    const url = Mongodb_global.url
    const client = new MongoClient(url)
    let datas = []

    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")

        const db = client.db(process.env.DB_NAME)
        const collection = db.collection(process.env.DB_COLLECTION as string)

        // 查询函数
        const cursor = collection.find(query)

        const matchnum = await collection.countDocuments(query)
        // 数据处理
        if (matchnum === 0) {
            return mongodbResponeHandle(true, "查询成功,无匹配对象")
        }

        for await (const doc of cursor) {
            // console.log(doc)
            datas.push(doc)
        }

        const message = `查询成功,匹配到${matchnum}条数据`
        return mongodbResponeHandle(true, message, datas)
    } catch (error) {
        // console.log("Failed to connect to MongoDB", error)
        return mongodbResponeHandle(false, "查询失败")
    } finally {
        await client.close()
        console.log("Connection to MongoDB closed")
    }
}
