import { DataBaseUrl, DataBaseUrlArray } from "@/api/mongodb/global/constant"
import { mongodbRespone } from "@/api/mongodb/types"
import * as mongodb from "@/api/mongodb/hooks"

abstract class DataBaseClinet {
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

    abstract find(query?: any, limit?: number): Promise<mongodbRespone<any>>
    abstract insert(query: any): Promise<mongodbRespone<any>>
    abstract delete(query: any): Promise<mongodbRespone<any>>
    abstract update(query: any, update: any): Promise<mongodbRespone<any>>
}

class UserDataBaseClinet extends DataBaseClinet {
    constructor() {
        super(DataBaseUrl.UserUrl)
    }

    public override async find(query: any): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]

        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.findDocuments(dbName, collectionName, url, query)
    }

    public override async insert(query: any): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]

        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.insertDocuments(dbName, collectionName, url, query)
    }

    public override async delete(query: any): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]

        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.deleteDocuments(dbName, collectionName, url, query)
    }

    public override async update(query: any, update: any): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]

        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.updateDocuments(dbName, collectionName, url, query, update)
    }
}

class DeviceDataBaseClinet extends DataBaseClinet {
    constructor() {
        super(DataBaseUrl.UserUrl)
    }

    public override async find(limit: number, query: any): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]

        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.findDocuments(dbName, collectionName, url, query, limit)
    }

    public override async insert(query: any): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]

        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.insertDocuments(dbName, collectionName, url, query)
    }

    public override async delete(query: any): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]

        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.deleteDocuments(dbName, collectionName, url, query)
    }

    public override async update(query: any, update: any): Promise<mongodbRespone<any>> {
        const dbName = this.getDatabaseName()
        const collectionName = this.getCollectionName()
        const url = DataBaseUrlArray[this.url]

        if (!dbName || !collectionName || !url)
            throw new Error(`数据库连接信息错误,缺失参数: dbName, collectionName, url`)

        return await mongodb.updateDocuments(dbName, collectionName, url, query, update)
    }
}

export const UserDBClinet = new UserDataBaseClinet()
export const DeviceDBClinet = new DeviceDataBaseClinet()
