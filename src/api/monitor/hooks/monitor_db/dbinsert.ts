import { DeviceDBClinet } from "@/api/mongodb/class"
import { type mongodbRespone, mongodbResponeHandle } from "@/api/mongodb/types"
import { type DeviceType } from "@/api/monitor/types"
import moment from "moment"
import { v4 as uuidv4 } from "uuid"

// 监视器创建设备
export const monitor_insert = async (query: DeviceType): Promise<mongodbRespone<any>> => {
    if (!query) {
        return mongodbResponeHandle(false, "查询路由传入参数缺失:query")
    }

    // 判断uuid是否存在
    if (query.id === undefined || query.id === "") query.id = uuidv4()
    // 设备创建时间
    query.create_time = moment().format("YYYY-MM-DD HH:mm:ss")

    return await DeviceDBClinet.insert(query)
}

// 监视器删除设备
export const monitor_remove = async (DeviceIDs: string[]): Promise<mongodbRespone<any>> => {
    if (!DeviceIDs) {
        return mongodbResponeHandle(false, "查询路由传入参数缺失:DeviceIDs")
    }

    // 处理参数为数据库标准格式
    const query = { id: { $in: DeviceIDs } }
    // 删除设备
    return await DeviceDBClinet.deleteItems(query)
}
