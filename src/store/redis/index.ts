// redis封装
import Redis, { type RedisOptions, type RedisKey } from "ioredis"

class RedisClient {
    private redisClient: Redis

    constructor(options: RedisOptions) {
        this.redisClient = new Redis(options)
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
}

export const redisClient = new RedisClient({
    port: 6379,
    host: "127.0.0.1"
})
