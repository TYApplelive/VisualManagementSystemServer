import { DataBaseUrl, DataBaseUrlArray } from "@/api/mongodb/global/constant"
import { mongodbRespone } from "@/api/mongodb/types"
import * as mongodb from "@/api/mongodb/hooks"

class DataBaseClinet {
    protected url: DataBaseUrl
    constructor(url: DataBaseUrl) {
        this.url = url
    }

    protected getDatabaseName(): string | void {
        switch (this.url) {
            case DataBaseUrl.UserUrl:
                return process.env.DB_USER_DATABASE_NAME
            case DataBaseUrl.DeviceUrl:
                return process.env.DB_DEV_DATABASE_NAME
            // 根据需要添加更多的数据库类型
            default:
                throw new Error("Unsupported database type")
        }
    }

    protected getCollectionName(): string | void {
        switch (this.url) {
            case DataBaseUrl.UserUrl:
                return process.env.DB_USER_COLLECTION
            case DataBaseUrl.DeviceUrl:
                return process.env.DB_DEV_COLLECTION
            // 根据需要添加更多的数据库类型
            default:
                throw new Error("Unsupported database type")
        }
    }

    public async find(query: any, limit: number, skip: number): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]

        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.findDocuments(dbName, collectionName, url, query, limit, skip)
    }

    public async insert(query: any): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]

        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.insertDocuments(dbName, collectionName, url, query)
    }

    public async delete(query: any): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]
        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.deleteDocument(dbName, collectionName, url, query)
    }

    public async deleteItems(query: any): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]
        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.deleteDocuments(dbName, collectionName, url, query)
    }

    public async update(query: any, update: any): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]

        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.updateDocuments(dbName, collectionName, url, query, update)
    }
}

/*用户数据库接口句柄客户端*/
class UserDataBaseClinet extends DataBaseClinet {
    constructor() {
        super(DataBaseUrl.UserUrl)
    }

    public async find(query: any): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]

        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.findDocuments(dbName, collectionName, url, query)
    }
}

/*设备数据库接口句柄客户端*/
class DeviceDataBaseClinet extends DataBaseClinet {
    constructor() {
        super(DataBaseUrl.DeviceUrl)
    }
}

export const UserDBClinet = new UserDataBaseClinet()
export const DeviceDBClinet = new DeviceDataBaseClinet()
