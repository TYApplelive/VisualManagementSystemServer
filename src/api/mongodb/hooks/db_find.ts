//. 查找功能
import { MongoClient } from "mongodb"
import Mongodb_global from "../global/constant"
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

        // 数据处理
        if ((await collection.countDocuments(query)) === 0) {
            return mongodbResponeHandle(true, "查询成功,无匹配对象")
        }

        for await (const doc of cursor) {
            // console.log(doc)
            datas.push(doc)
        }

        return mongodbResponeHandle(
            true,
            `查询成功,匹配到${collection.countDocuments}条数据`,
            datas
        )
    } catch (error) {
        // console.log("Failed to connect to MongoDB", error)
        return mongodbResponeHandle(false, "查询失败")
    } finally {
        await client.close()
        console.log("Connection to MongoDB closed")
    }
}
