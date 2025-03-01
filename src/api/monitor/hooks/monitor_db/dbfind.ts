import { DeviceDBClinet } from "@/api/mongodb/class"
import { type mongodbRespone, mongodbResponeHandle } from "@/api/mongodb/types"

// 监视器查询参数
export const monitor_find = async (
    limit: number,
    skip?: number,
    query?: any
): Promise<mongodbRespone<any>> => {
    if (limit === undefined) return mongodbResponeHandle(false, "查询路由传入参数错误:limit")

    let findquery = query ?? {}

    return await DeviceDBClinet.find(findquery, limit, skip ?? 0)
}
