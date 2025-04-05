// redis封装
import { error } from "console"
import Redis, { type RedisOptions, type RedisKey } from "ioredis"

class RedisClient {
    private redisClient: Redis

    constructor(options: RedisOptions) {
        this.redisClient = new Redis(options)

        let errorLogged = false
        this.redisClient.on("error", (err) => {
            if (!errorLogged) {
                console.error(`Redis连接出错: ${err.message}`)
                errorLogged = true
                const retryInterval = 5000 // 重试间隔为 5 秒
                console.log(`将在 ${retryInterval / 1000} 秒后重试连接...`)
                setTimeout(() => {
                    // 重新创建 Redis 实例
                    const newRedis = new Redis()
                    newRedis.on("error", (newError) => {})
                    newRedis.on("connect", () => {
                        console.log("成功重新连接到 Redis 服务器")
                        errorLogged = false
                    })
                }, retryInterval)
            }
        })
        // 监听 connect 事件，连接成功时输出日志
        this.redisClient.on("connect", () => {
            console.log("成功连接到 Redis 服务器")
        })
    }

    public async setKey(key: string, value: any, expire?: number): Promise<void> {
        try {
            value = JSON.stringify(value)
            if (expire) {
                await this.redisClient.set(key, value, "EX", expire)
                console.info(`Key ${key} set successfully with expiration ${expire}`)
            } else {
                await this.redisClient.set(key, value)
                console.info(`Key ${key} set successfully`)
            }
        } catch (error) {
            console.error(`Failed to set key ${key}: ${error}`)
            throw error
        }
    }

    public async getKey(key: string): Promise<any | null> {
        try {
            const value = await this.redisClient.get(key)
            if (value) {
                console.info(`Key ${key} retrieved successfully`)
                return JSON.parse(value)
            } else {
                console.info(`Key ${key} not found`)
                return null
            }
        } catch (error) {
            console.error(`Failed to get key ${key}: ${error}`)
            throw error
        }
    }

    public async delKey(key: RedisKey[]): Promise<number> {
        try {
            const result = await this.redisClient.del(key)
            console.info(`Key ${key} deleted successfully`)
            return result
        } catch (error) {
            console.error(`Failed to delete key ${key}: ${error}`)
            throw error
        }
    }

    public async existsKey(key: string): Promise<number> {
        try {
            const result = await this.redisClient.exists(key)
            console.info(`Checked existence of key ${key}`)
            return result
        } catch (error) {
            console.error(`Failed to check existence of key ${key}: ${error}`)
            throw error
        }
    }

    public async clearCache(pattern: string) {
        const keys = await this.redisClient.keys(pattern)
        console.log(`Clear Cache Keys ${keys}`)
        if (keys.length !== 0) {
            const result = await this.delKey(keys)
            console.log(`Clear Cache key number: ${result}`)
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await this.redisClient.quit()
            console.info("Redis client disconnected")
        } catch (error) {
            console.error(`Failed to disconnect Redis client: ${error}`)
            throw error
        }
    }

    //查询相关的Keys
    public async GetKeys(key: string): Promise<string[]> {
        try {
            const keys = await this.redisClient.keys(key)
            return keys
        } catch (error) {
            console.error(`Failed to get keys: ${error}`)
            throw error
        }
    }

    /**
     * 获取指定模式下的最新消息
     * @param pattern 键的模式（如 "topic:*"）
     * @returns 最新消息的键和值，如果没有则返回 null
     */
    public async getLatestMessage(pattern: string): Promise<{ key: string; value: string } | null> {
        try {
            // 获取所有匹配的键
            const keys = await this.redisClient.keys(pattern)
            if (keys.length === 0) {
                return null
            }

            // 按时间戳排序，获取最新的键
            const latestKey = keys.sort().reverse()[0]

            // 获取值
            const value = await this.getKey(latestKey)
            return { key: latestKey, value }
        } catch (error) {
            console.error(`Failed to get latest message: ${error}`)
            throw error
        }
    }
}

export const redisClient = new RedisClient({
    port: 6379,
    host: "127.0.0.1"
})
