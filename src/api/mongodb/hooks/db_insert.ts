//. 插入功能
import { MongoClient, type OptionalUnlessRequiredId } from "mongodb"
import Mongodb_global from "../global/constant"

export const insertDocuments = async (query: any) => {
    const url = Mongodb_global.url
    const client = new MongoClient(url)
    try {
        await client.connect()
        const db = client.db(process.env.DB_NAME)
        const collection = db.collection(process.env.DB_COLLECTION as string)
        const result = await collection.insertOne(query)
        console.log(`A document was inserted with the _id: ${result.insertedId}`)
    } catch (error) {
        console.log("Failed to connect to MongoDB", error)
    } finally {
        await client.close()
        console.log("Connection to MongoDB closed")
    }
}
