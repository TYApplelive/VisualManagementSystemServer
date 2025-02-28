//. 插入功能
import { MongoClient } from "mongodb"
import Mongodb_global from "../global/constant"

//. 数据库返回处理
import { mongodbRespone, mongodbResponeHandle } from "@/api/mongodb/types"
export const insertDocuments = async (query: any): Promise<mongodbRespone<any>> => {
    const url = Mongodb_global.url
    const client = new MongoClient(url)
    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")
        const db = client.db(process.env.DB_USER_DATABASE_NAME)
        const collection = db.collection(process.env.DB_USER_COLLECTION as string)

        // 数据处理
        const result = await collection.insertOne(query)

        // 返回处理
        return mongodbResponeHandle(true, `插入一个文档, _id: ${result.insertedId}`, result)
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
