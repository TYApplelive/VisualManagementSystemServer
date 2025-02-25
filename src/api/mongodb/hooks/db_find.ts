//. 查找功能
import { MongoClient } from "mongodb"
import Mongodb_global from "../global/constant"
import type { TypeUser } from "../types"

export const findDocuments = async (query: any) => {
    const url = Mongodb_global.url
    const client = new MongoClient(url)

    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")

        const db = client.db(process.env.DB_NAME)
        const collection = db.collection<TypeUser>(process.env.DB_COLLECTION as string)

        const cursor = collection.find<TypeUser>(query) // 全部查询

        // 数据处理
        if ((await collection.countDocuments(query)) === 0) {
            console.warn("No documents found!")
        }

        for await (const doc of cursor) {
            console.log(doc)
        }
    } catch (error) {
        console.log("Failed to connect to MongoDB", error)
    } finally {
        await client.close()
        console.log("Connection to MongoDB closed")
    }
}
