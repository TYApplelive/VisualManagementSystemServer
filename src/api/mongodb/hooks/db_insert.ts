//. 插入功能
import { MongoClient } from "mongodb"

//. 数据库返回处理
import { mongodbRespone, mongodbResponeHandle } from "@/api/mongodb/types"
export const insertDocuments = async (
    dbName: string,
    collectionName: string,
    url: string,
    query: any
): Promise<mongodbRespone<any>> => {
    const client = new MongoClient(url)
    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

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
