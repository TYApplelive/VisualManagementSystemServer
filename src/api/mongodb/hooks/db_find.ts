//. 查找功能
import { MongoClient } from "mongodb"

export const findDocuments = async () => {
    const url = "mongodb://localhost:27017"
    const client = new MongoClient(url)

    try {
        await client.connect()
        console.log("Successfully connected to MongoDB")

        const db = client.db("mydatabase")
        const collection = db.collection("mycollection")

        const cursor = collection.find()
        await cursor.forEach((document) => {
            console.log("Document found:", document)
        })
    } catch (error) {
        console.log("Failed to connect to MongoDB", error)
    } finally {
        await client.close()
        console.log("Connection to MongoDB closed")
    }
}
