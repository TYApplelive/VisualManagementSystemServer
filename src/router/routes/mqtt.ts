// Mqtt 操作函数
import express from "express"
import * as mqtt from "@/api/monitor/mqttClinet"
import { routerResponeHandle } from "@/router/types/router_return"

const router = express.Router()
router.get("/", (req, res) => {
    res.send(routerResponeHandle("Mqtt Router Test!", true, "Successful!"))
})

router.get("/open", (req, res) => {
    var topic = process.env.MQTT_TOPIC_Device1
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

export default router
