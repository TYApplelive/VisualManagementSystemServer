//. 查找功能
import { MongoClient } from "mongodb"
import Mongodb_global from "../global/constant"
import type { TypeUser } from "../types"

export const deleteDocuments = async (query: any) => {
    const url = Mongodb_global.url
    const client = new MongoClient(url)

    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")

        const db = client.db(process.env.DB_NAME)
        const collection = db.collection<TypeUser>(process.env.DB_COLLECTION as string)
        const result = await collection.deleteOne(query)

        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.")
        } else {
            console.log("No documents matched the query. Deleted 0 documents.")
        }
    } catch (error) {
        console.log("Failed to connect to MongoDB", error)
    } finally {
        await client.close()
        console.log("Connection to MongoDB closed")
    }
}
