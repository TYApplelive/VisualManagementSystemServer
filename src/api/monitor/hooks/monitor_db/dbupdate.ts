import { DeviceDBClinet } from "@/api/mongodb/class"
import { type mongodbRespone, mongodbResponeHandle } from "@/api/mongodb/types"
import { DeviceType } from "../../types"
import moment from "moment"

// 监视器查询参数
export const monitor_update = async (
    findParam: any,
    updateParam: DeviceType
): Promise<mongodbRespone<any>> => {
    if (findParam === undefined)
        return mongodbResponeHandle(false, "查询路由传入参数错误:findParam")

    // 更新日期
    updateParam.last_update_time = moment().format("YYYY-MM-DD HH:mm:ss")

    return await DeviceDBClinet.update(findParam, updateParam)
}
