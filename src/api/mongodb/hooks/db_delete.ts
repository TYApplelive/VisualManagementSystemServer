//. 查找功能
import { MongoClient } from "mongodb"
import Mongodb_global from "../global/constant"

//. 数据库返回处理
import { mongodbRespone, mongodbResponeHandle } from "@/api/mongodb/types"
export const deleteDocuments = async (query: any): Promise<mongodbRespone<any>> => {
    const url = Mongodb_global.url
    const client = new MongoClient(url)

    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")
        const db = client.db(process.env.DB_NAME)
        const collection = db.collection(process.env.DB_COLLECTION as string)

        // 数据处理
        const result = await collection.deleteOne(query)
        let result_msg = ""
        // 返回处理
        if (result.deletedCount === 1) {
            result_msg = `成功删除一个文档`
        } else {
            result_msg = `没有匹配的文档`
        }

        return mongodbResponeHandle(true, result_msg, result)
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
