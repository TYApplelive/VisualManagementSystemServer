// 设备类型
export enum MCUDevices {
    NONE = -1,
    MCU = 0,
    LED,
    SC7A20,
    EEPROM,
    GPS,
    NBIOT
}

//  LED控制命令
export enum LEDCmd {
    NONE = -1,
    OFF = 0,
    ON,
    BLINK
}

// MCU控制命令
export enum MCUCmd {
    NONE = -1,
    STANDBY = 0
}

// SC7A20控制命令
export enum SC7A20Cmd {
    NONE = -1,
    GETDATA = 0,
    CALIBRATE
}

// MQTT控制命令
export interface MqttCmd {
    Device: MCUDevices
    Cmd: MCUCmd | LEDCmd | SC7A20Cmd
}
