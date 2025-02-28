//. 查找功能
import { MongoClient } from "mongodb"

//. 数据库返回处理
import { mongodbRespone, mongodbResponeHandle } from "@/api/mongodb/types"
export const updateDocuments = async (
    dbName: string,
    collectionName: string,
    url: string,
    query: any,
    update: any
): Promise<mongodbRespone<any>> => {
    const client = new MongoClient(url)
    let result_result = true

    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        // 数据处理
        const result = await collection.updateOne(
            query,
            update,
            /* 如果没有找到这个待更新文档,则不会插入一个新的文档 */
            { upsert: false }
        )

        if (result.matchedCount === 0 || result.modifiedCount === 0) {
            result_result = false
        }

        // 返回处理
        return mongodbResponeHandle(
            result_result,
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
