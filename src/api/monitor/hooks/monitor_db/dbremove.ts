import { DeviceDBClinet } from "@/api/mongodb/class"
import { type mongodbRespone, mongodbResponeHandle } from "@/api/mongodb/types"

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
