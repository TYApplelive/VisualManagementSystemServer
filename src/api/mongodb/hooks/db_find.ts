//. 查找功能
import { MongoClient } from "mongodb"
<<<<<<< HEAD

export const findDocuments = async () => {
    const url = "mongodb://localhost:27017"
=======
import Mongodb_global from "../global/constant"
import type { TypeUser } from "../types"

export const findDocuments = async (query: any) => {
    const url = Mongodb_global.url
>>>>>>> ea6c997af0549d95f0473bc95b7cc1111957a513
    const client = new MongoClient(url)

    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")

<<<<<<< HEAD
        const db = client.db("mydatabase")
        const collection = db.collection("mycollection")

        const cursor = collection.find()
        await cursor.forEach((document) => {
            console.log("Document found:", document)
        })
=======
        const db = client.db(process.env.DB_NAME)
        const collection = db.collection(process.env.DB_COLLECTION as string)

        const cursor = collection.find<TypeUser>(query) // 全部查询

        // 数据处理
        if ((await collection.countDocuments(query)) === 0) {
            console.warn("No documents found!")
        }

        for await (const doc of cursor) {
            console.log(doc)
        }
>>>>>>> ea6c997af0549d95f0473bc95b7cc1111957a513
    } catch (error) {
        console.log("Failed to connect to MongoDB", error)
    } finally {
        await client.close()
        console.log("Connection to MongoDB closed")
    }
}
