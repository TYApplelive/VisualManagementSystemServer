// . Mqtt客户端相关函数
// server.ts
import mqtt from "mqtt"
import * as global from "@/api/monitor/global/constant"
import { redisClient } from "@/store/redis"

let mqttClient: mqtt.MqttClient | null = null

export const connectMqttClient = (topic: string) => {
    if (mqttClient) {
        console.log("MQTT客户端已连接,无需重复连接")
        return
    }

    mqttClient = mqtt.connect(global.mqttconnectUrl, {
        connectTimeout: 4000,
        username: "Express服务器",
        protocolVersion: 4 /* 设定MQTT协议版本为3.1*/
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

    mqttClient.on("message", async (topic, message) => {
        console.log(`收到来自主题:\'${topic}\'的消息: ${message.toString()} `)

        const key = `${topic}:${Date.now()}`
        const messageString = message.toString()
        console.log("收到消息:", messageString)
        // 判断消息类型并存储到redis
        if (messageString.startsWith("ECHO")) {
            console.log("收到ECHO消息")
            const [header, ...data] = messageString.split(",")
            const [echoPrefix, deviceID] = header.split(":")
            const parseData = data.reduce(
                (acc, item) => {
                    const [key, value] = item.split(":")
                    acc[key.toLowerCase()] = parseFloat(value)
                    return acc
                },
                {} as { [key: string]: number }
            )
            redisClient.setKey(key, { deviceID, ...parseData }, 20)
            console.log("ECHO消息已保存到Redis")
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

/**
 * 发布MQTT消息
 */
export const publishMqttMessage = (topic: string, message: string) => {
    if (mqttClient) {
        mqttClient.publish(topic, message)
    } else {
        console.log("MQTT客户端未连接,无法发布消息")
    }
}

/**
 * 检测MQTT连接状态
 */
export const checkMqttConnection = () => {
    if (mqttClient) {
        return mqttClient.connected
    } else {
        return false
    }
}
