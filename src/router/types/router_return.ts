import moment from "moment"

export interface routerRespone<T> {
    result?: boolean // 函数结果
    tips?: string // 提示信息
    date: string
    data?: T // 相关数据
}

/**
 * @description 封装路由返回数据格式
 */
export const routerResponeHandle = <T>(
    tips?: string,
    result?: boolean,
    data?: T
): routerRespone<T> => {
    return {
        result: result || false,
        tips: tips || "",
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
        data
    }
}
