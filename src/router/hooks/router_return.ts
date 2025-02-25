export interface routerRespone<T> {
    result?: boolean // 函数结果
    tips?: string // 提示信息
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
        data
    }
}
