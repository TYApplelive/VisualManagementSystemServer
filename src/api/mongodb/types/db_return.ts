export interface mongodbRespone<T> {
    result?: boolean // 函数结果
    message?: string // 提示信息
    data?: T // 相关数据
    [key: string]: any // 其他参数
}

/**
 * @description 封装数据库函数返回结果
 */
export const mongodbResponeHandle = <T>(
    result?: boolean,
    message?: string,
    data?: T,
    ...other: Record<string, any>[]
): mongodbRespone<T> => {
    return {
        result: result || false,
        message: message || "",
        data,
        ...other[0]
    }
}
