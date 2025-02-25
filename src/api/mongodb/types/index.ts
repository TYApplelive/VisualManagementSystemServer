//. 数据库用户数据类型定义

export enum UserStatus {
    Registered = "已注册",
    Unregistered = "未注册",
    Deleted = "已删除"
}

export enum UserRole {
    Admin = "管理员",
    User = "普通用户"
}

interface TypeUserInfo {
    email: string
}

export interface TypeUser {
    account: string
    password: string
    user_info: TypeUserInfo
    create_time: string
    id: string
    status: UserStatus
    role: UserRole
}
