// . monitor全局变量 mqtt
export const mqtthost = process.env.MQTT_HOST
export const mqttport = process.env.MQTT_PORT
export const mqttconnectUrl = `mqtt://${mqtthost}:${mqttport}`
