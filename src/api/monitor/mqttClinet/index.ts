// . Mqtt客户端相关函数
// server.ts
import mqtt from "mqtt"
import * as global from "@/api/monitor/global/constant"

let mqttClient: mqtt.MqttClient | null = null

export const connectMqttClient = (topic: string) => {
    if (mqttClient) {
        console.log("MQTT客户端已连接,无需重复连接")
        return
    }

    mqttClient = mqtt.connect(global.mqttconnectUrl, {
        connectTimeout: 4000,
        username: "Express服务器"
    })

    mqttClient.on("connect", () => {
        console.log("MQTT客户端已连接")
        mqttClient?.subscribe(topic, (err) => {
            if (err) {
                console.error("订阅主题失败:", err)
            } else {
                console.log(`订阅主题\`${topic}\`成功`)
            }
        })
    })

    mqttClient.on("message", (topic, message) => {
        console.log(`收到来自主题:\'${topic}\'的消息: ${message.toString()} `)
        try {
            const messageString = message.toString()
            const messageJson = JSON.parse(messageString)
            const data = { ...messageJson }
            console.log(`解析得到：\n`, data)
        } catch (error) {
            console.error("JSON数据解析失败", error)
        }
    })

    mqttClient.on("error", (err) => {
        console.error("MQTT客户端错误:", err)
    })

    mqttClient.on("close", () => {
        console.log("MQTT客户端已断开连接")
        mqttClient = null
    })
}

/**
 * 断开MQTT客户端连接
 */
export const disconnectMqttClient = () => {
    if (mqttClient) {
        mqttClient.end()
        mqttClient = null
    } else {
        console.log("MQTT客户端未连接,无需断开")
    }
}
