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
        const db = client.db(process.env.DB_USER_NAME)
        const collection = db.collection(process.env.DB_USER_COLLECTION as string)

        // 查询函数
        const cursor = collection.find(query)
        const matchnum = await collection.countDocuments(query)

        // 数据处理
        if (matchnum === 0) {
            return mongodbResponeHandle(true, "查询成功,无匹配对象")
        }
        for await (const doc of cursor) {
            datas.push(doc)
        }

        // 返回处理
        return mongodbResponeHandle(true, `查询成功,匹配到${matchnum}条数据`, datas)
    } catch (error) {
        if (error instanceof Error) {
            throw mongodbResponeHandle(false, "查询错误", error.message)
        } else {
            throw mongodbResponeHandle(false, "查询错误", "未知错误")
        }
    } finally {
        await client.close()
        console.log("Connection to MongoDB closed")
    }
}
