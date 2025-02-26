import net from "net"
// 监听服务器 TCP 传输
export const tcpserver = net.createServer((socket) => {
    // TODO 连接拦截+验证
    console.log("客户端连接成功", socket.remoteAddress)

    socket.on("data", (data) => {
        console.log(`客户端发送的数据: ${data} , 接收到得字节数 ${socket.bytesRead} `)
        socket.write("服务器已收到数据")
        //TODO 存储信息
    })

    socket.on("error", (err) => {
        console.error(`客户端错误: ${err}`)
    })

    socket.on("end", () => {
        console.log("数据接收完毕")
    })

    socket.on("close", () => {
        console.log("服务器关闭连接")
    })
})

import mqtt from "mqtt"

const host = "106.53.102.145"
const port = "1883"
const connectUrl = `mqtt://${host}:${port}`
const topic = "test"
export const createMqttClient = () => {
    const mqttClient = mqtt.connect(connectUrl, {
        connectTimeout: 4000,
        reconnectPeriod: 1000,
        username: "Express"
    })

    mqttClient.on("connect", () => {
        console.log("MQTT客户端已连接")
        mqttClient.subscribe(topic, (err) => {
            if (err) {
                console.error("订阅主题失败:", err)
            } else {
                console.log(`订阅主题\'${topic}\'成功`)
            }
        })
    })

    mqttClient.on("message", (topic, message) => {
        try {
            const messageString = message.toString()
            const messageJson = JSON.parse(messageString)
            const msgValue = messageJson.msg
            console.log(`收到主题\'${topic}\'的消息:\n${messageString}`)
            console.log(`msg 字段的值: ${msgValue}`)
        } catch (error) {
            console.error("解析消息时出错:", error)
        }
    })

    mqttClient.on("error", () => {
        console.error("MQTT客户端连接错误")
    })

    return mqttClient
}
