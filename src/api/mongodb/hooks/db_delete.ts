//. 查找功能
import { MongoClient } from "mongodb"

//. 数据库返回处理
import { mongodbRespone, mongodbResponeHandle } from "@/api/mongodb/types"
export const deleteDocument = async (
    dbName: string,
    collectionName: string,
    url: string,
    query: any
): Promise<mongodbRespone<any>> => {
    const client = new MongoClient(url)
    let result_msg = ""
    let result_staus = true

    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        // 数据处理
        const result = await collection.deleteOne(query)

        // 返回处理
        if (result.deletedCount === 1) {
            result_msg = `成功删除一个文档`
        } else {
            result_msg = `没有匹配的文档`
            result_staus = false
        }

        return mongodbResponeHandle(result_staus, result_msg, result)
    } catch (error) {
        if (error instanceof Error) {
            throw mongodbResponeHandle(false, "删除错误", error.message)
        } else {
            throw mongodbResponeHandle(false, "删除错误", "未知错误")
        }
    } finally {
        await client.close()
        console.log("Connection to MongoDB closed")
    }
}

export const deleteDocuments = async (
    dbName: string,
    collectionName: string,
    url: string,
    query: any
): Promise<mongodbRespone<any>> => {
    const client = new MongoClient(url)
    let result_msg = ""
    let result_staus = true

    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        // 数据处理
        const result = await collection.deleteMany(query)

        const deleteNum = result.deletedCount
        // 返回处理
        if (deleteNum) {
            result_msg = `成功删除${deleteNum}个文档`
        } else {
            result_msg = `没有匹配的文档`
            result_staus = false
        }

        // 附加参数：删除数量
        return mongodbResponeHandle(result_staus, result_msg, result, { deleteNum })
    } catch (error) {
        if (error instanceof Error) {
            throw mongodbResponeHandle(false, "删除错误", error.message)
        } else {
            throw mongodbResponeHandle(false, "删除错误", "未知错误")
        }
    } finally {
        await client.close()
        console.log("Connection to MongoDB closed")
    }
}
