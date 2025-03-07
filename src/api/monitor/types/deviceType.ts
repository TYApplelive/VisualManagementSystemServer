// 设备类型结构
export interface DeviceType {
    name: string
    id: string
    status: string
    ip: string
    address: string
    create_time: string
    EFC?: string //! 暂时是？后面确定后改为确定值
}

// 设备更新query类型结构
export interface UpdateQueryDeviceType {
    findParam: string
    updateParam: DeviceType
}
