import { DeviceDBClinet } from "@/api/mongodb/class"
import { type mongodbRespone, mongodbResponeHandle } from "@/api/mongodb/types"
import { DeviceType } from "../../types"

// 监视器查询参数
export const monitor_update = async (
    findParam: any,
    updateParam: DeviceType
): Promise<mongodbRespone<any>> => {
    if (findParam === undefined)
        return mongodbResponeHandle(false, "查询路由传入参数错误:findParam")

    return await DeviceDBClinet.update(findParam, updateParam)
}
