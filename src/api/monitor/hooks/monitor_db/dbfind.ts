import * as mongodb from "@/api/mongodb"
import type { mongodbRespone } from "@/api/mongodb/types"

// 监视器查询参数
export const monitor_find = async (limit: number, query?: any): Promise<mongodbRespone<any>> => {
    if (limit === undefined)
        return mongodb.mongodbResponeHandle(false, "查询路由传入参数错误:limit")
    if (query === undefined) {
        return await mongodb.findDocuments({})
    } else {
        return await mongodb.findDocuments(query)
    }
}
