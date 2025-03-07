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
    query.last_update_time = query.create_time

    return await DeviceDBClinet.insert(query)
}
