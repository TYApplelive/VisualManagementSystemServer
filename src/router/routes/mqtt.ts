// Mqtt 操作函数
import express from "express"
import * as mqtt from "@/api/monitor/mqttClinet"
import { routerResponeHandle } from "@/router/types/router_return"
import { type MqttCmd, type SC7A20Data, LEDCmd, MCUDevices, SC7A20Cmd } from "@/router/types"
import { redisClient } from "@/store/redis"

const router = express.Router()
router.get("/", (req, res) => {
    res.send(routerResponeHandle("Mqtt Router Test!", true, "Successful!"))
})

router.get("/open", (req, res) => {
    var topic = process.env.MQTT_TOPIC_Device
    // 主题订阅检查
    if (topic == undefined) {
        res.send(routerResponeHandle("Mqtt Topic is undefined!", false))
        return
    }
    // 打开mqtt客户端并订阅主题
    mqtt.connectMqttClient(topic)
    res.send(routerResponeHandle("Mqtt Open!", true))
})

router.get("/close", (req, res) => {
    // 关闭mqtt客户端
    mqtt.disconnectMqttClient()
    res.send(routerResponeHandle("Mqtt Close!", true))
})

router.get("/led/on", (req, res) => {
    var topic = process.env.MQTT_TOPIC_Device
    // 主题订阅检查
    if (topic == undefined) {
        res.send(routerResponeHandle("Mqtt Topic is undefined!", false))
        return
    }
    const mqttCMD: MqttCmd = {
        Device: MCUDevices.LED,
        Cmd: LEDCmd.ON
    }
    mqtt.publishMqttMessage(topic, `${mqttCMD.Device},${mqttCMD.Cmd}`)
    res.send(routerResponeHandle("开启", true))
})

router.get("/led/off", (req, res) => {
    var topic = process.env.MQTT_TOPIC_Device
    // 主题订阅检查
    if (topic == undefined) {
        res.send(routerResponeHandle("Mqtt Topic is undefined!", false))
        return
    }
    const mqttCMD: MqttCmd = {
        Device: MCUDevices.LED,
        Cmd: LEDCmd.OFF
    }
    mqtt.publishMqttMessage(topic, `${mqttCMD.Device},${mqttCMD.Cmd}`)
    res.send(routerResponeHandle("关闭", true))
})

router.get("/led/blink", (req, res) => {
    var topic = process.env.MQTT_TOPIC_Device
    // 主题订阅检查
    if (topic == undefined) {
        res.send(routerResponeHandle("Mqtt Topic is undefined!", false))
        return
    }
    const mqttCMD: MqttCmd = {
        Device: MCUDevices.LED,
        Cmd: LEDCmd.BLINK
    }
    mqtt.publishMqttMessage(topic, `${mqttCMD.Device},${mqttCMD.Cmd}`)
    res.send(routerResponeHandle("闪烁", true))
})

router.get("/sc7a20/getdata", async (req, res) => {
    var topic = process.env.MQTT_TOPIC_Device
    // 主题订阅检查
    if (topic == undefined) {
        res.send(routerResponeHandle("Mqtt Topic is undefined!", false))
        return
    }
    const mqttCMD: MqttCmd = {
        Device: MCUDevices.SC7A20,
        Cmd: SC7A20Cmd.GETDATA
    }
    // 发送命令
    mqtt.publishMqttMessage(topic, `${mqttCMD.Device},${mqttCMD.Cmd}`)

    /*从Redis中读取最新的数据 */
    try {
        const maxWaitTime = 20000
        const startTime = Date.now()

        while (Date.now() - startTime < maxWaitTime) {
            const latestMessage = await redisClient.getLatestMessage(`${topic}:*`)
            if (latestMessage) {
                res.send(routerResponeHandle("SC7A20姿态信息", true, latestMessage.value))
            }
            // 等待一段时间再重试（例如 500 毫秒）
            await new Promise((resolve) => setTimeout(resolve, 500))
        }
        // 超时后返回消息丢失
        res.send(routerResponeHandle("消息丢失", false))
    } catch (error) {
        console.error("从 Redis 获取消息失败:", error)
        res.send(routerResponeHandle("获取MQTT消息失败", false))
    }
})

router.get("/sc7a20/calibrate", (req, res) => {
    var topic = process.env.MQTT_TOPIC_Device
    // 主题订阅检查
    if (topic == undefined) {
        res.send(routerResponeHandle("Mqtt Topic is undefined!", false))
        return
    }
    const mqttCMD: MqttCmd = {
        Device: MCUDevices.SC7A20,
        Cmd: SC7A20Cmd.CALIBRATE
    }
    mqtt.publishMqttMessage(topic, `${mqttCMD.Device},${mqttCMD.Cmd}`)
    res.send(routerResponeHandle("自调零", true))
})

export default router
