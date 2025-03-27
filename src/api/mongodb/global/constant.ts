// . 全局变量
//数据库连接url
export const UserUrl = `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_USER_DATABASE_NAME}`
export const DeviceUrl = `mongodb://${process.env.DB_DEV_NAME}:${process.env.DB_DEV_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DEV_DATABASE_NAME}`

// * 数据库枚举量
export enum DataBaseUrl {
    UserUrl,
    DeviceUrl
}

// * 数据库URL数组
// ! 严格于 @ref DataBaseUrl枚举 顺序
export const DataBaseUrlArray = [UserUrl, DeviceUrl]
