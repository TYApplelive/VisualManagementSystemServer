// . 全局变量 monitor
export const mqtthost = "106.53.102.145"
export const mqttport = "1883"
export const mqttconnectUrl = `mqtt://${mqtthost}:${mqttport}`

// * Mongodb数据库连接
const url = `mongodb://${process.env.DB_DEV_NAME}:${process.env.DB_DEV_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DEV_DATABASE_NAME}`
