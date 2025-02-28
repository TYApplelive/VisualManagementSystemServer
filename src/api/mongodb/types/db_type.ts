/**
 * 枚举变量
 */
export enum UserStatus {
    Registered = "已注册",
    Unregistered = "未注册",
    Deleted = "已删除"
}

export enum UserRole {
    Admin = "管理员",
    User = "普通用户"
}

interface _weak_TypeUserInfo {
    email?: string
}

interface TypeUserInfo {
    email: string
}

/**
 * 强类型用户数据类型定义
 * 用于完全数据参数传入
 * 例如插入数据
 */
export interface TypeUser {
    account: string
    password: string
    user_info: TypeUserInfo
    create_time: string
    id: string
    status: UserStatus
    role: UserRole
}

/**
 * 弱类型用户数据类型定义
 * 用于不完全数据参数传入
 * 例如更新某个数据，查找字段
 */
export interface _weak_TypeUser {
    account?: string
    password?: string
    user_info?: _weak_TypeUserInfo
    create_time?: string
    id?: string
    status?: UserStatus
    role?: UserRole
    [key: string]: any
}
