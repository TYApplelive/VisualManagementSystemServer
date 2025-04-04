// 定义从MQTT返回的SC7A20传感器获取的数据格式
export interface SC7A20Data {
    // 姿态数据
    tiltX: number // X轴倾斜角度
    tiltY: number // Y轴倾斜角度
    tiltZ: number // Z轴倾斜角度
}
