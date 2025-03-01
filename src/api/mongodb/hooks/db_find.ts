//. 查找功能
import { MongoClient } from "mongodb"
//. 数据库返回处理
import { mongodbRespone, mongodbResponeHandle } from "@/api/mongodb/types"

export async function findDocuments(
    dbName: string,
    collectionName: string,
    url: string,
    query?: any
): Promise<mongodbRespone<any>>

export async function findDocuments(
    dbName: string,
    collectionName: string,
    url: string,
    query: any,
    limit: number,
    skip: number
): Promise<mongodbRespone<any>>

export async function findDocuments(
    dbName: string,
    collectionName: string,
    url: string,
    query?: any,
    limit?: number,
    skip?: number
): Promise<mongodbRespone<any>> {
    const client = new MongoClient(url)
    let datas = []

    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        let cursor = null
        // 查询函数
        if (limit !== undefined && skip !== undefined) {
            cursor = collection.find(query).skip(skip).limit(limit)
        } else {
            cursor = collection.find(query)
        }
        const matchnum = await collection.countDocuments(query)

        // 数据处理
        if (matchnum === 0) {
            return mongodbResponeHandle(true, "查询成功,无匹配对象")
        }
        for await (const doc of cursor) {
            datas.push(doc)
        }

        // 返回信息
        let msg = `查询成功,匹配到${matchnum}条数据`
        if (limit) msg += `,限制${limit}条数据`
        if (skip) msg += `,跳过${skip}条数据`

        // 返回处理
        return mongodbResponeHandle(true, msg, datas)
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
