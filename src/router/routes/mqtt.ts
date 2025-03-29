// Mqtt 操作函数
import express from "express"
import * as mqtt from "@/api/monitor/mqttClinet"
const router = express.Router()
router.get("/", (req, res) => {
    res.send("Mqtt Router!")
})

router.get("/open", (req, res) => {
    var topic = process.env.MQTT_TOPIC_Device1
    if (topic == undefined) {
        res.send("Mqtt Topic is undefined!")
        return
    }
    // 打开mqtt客户端并订阅主题
    mqtt.connectMqttClient(topic)
    res.send("Mqtt Open!")
})

router.get("/close", (req, res) => {
    // 关闭mqtt客户端
    mqtt.disconnectMqttClient()
    res.send("Mqtt Close!")
})

export default router
