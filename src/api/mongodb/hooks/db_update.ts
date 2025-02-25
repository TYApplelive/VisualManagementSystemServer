//. 查找功能
import { MongoClient } from "mongodb"
import Mongodb_global from "../global/constant"
import type { TypeUser } from "../types"

export const updateDocuments = async (query: any, update: any) => {
    const url = Mongodb_global.url
    const client = new MongoClient(url)

    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")

        const db = client.db(process.env.DB_NAME)
        const collection = db.collection<TypeUser>(process.env.DB_COLLECTION as string)

        const result = await collection.updateOne(
            query,
            update,
            /* 如果没有找到这个待更新文档,则不会插入一个新的文档 */
            { upsert: false }
        )

        // 数据处理
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
        )
    } catch (error) {
        console.log("Failed to connect to MongoDB", error)
    } finally {
        await client.close()
        console.log("Connection to MongoDB closed")
    }
}
