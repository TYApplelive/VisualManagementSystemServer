//. 查找功能
import { MongoClient } from "mongodb"
import Mongodb_global from "../global/constant"

//. 数据库返回处理
import { mongodbRespone, mongodbResponeHandle } from "@/api/mongodb/types"
export const updateDocuments = async (query: any, update: any): Promise<mongodbRespone<any>> => {
    const url = Mongodb_global.url
    const client = new MongoClient(url)

    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")
        const db = client.db(process.env.DB_NAME)
        const collection = db.collection(process.env.DB_COLLECTION as string)

        // 数据处理
        const result = await collection.updateOne(
            query,
            update,
            /* 如果没有找到这个待更新文档,则不会插入一个新的文档 */
            { upsert: false }
        )

        // 返回处理
        return mongodbResponeHandle(
            true,
            `匹配到${result.matchedCount}个文档, 更新${result.modifiedCount}个文档`,
            result
        )
    } catch (error) {
        if (error instanceof Error) {
            throw mongodbResponeHandle(false, "插入错误", error.message)
        } else {
            throw mongodbResponeHandle(false, "插入错误", "未知错误")
        }
    } finally {
        await client.close()
        console.log("Connection to MongoDB closed")
    }
}
