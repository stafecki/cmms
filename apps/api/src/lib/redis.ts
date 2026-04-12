import { Redis, type RedisOptions } from "ioredis"

const REDIS_URL = process.env.REDIS_URL!

if (!REDIS_URL) {
    throw new Error("REDIS_URL is not defined in environment variables")
}

const options: RedisOptions = {
    lazyConnect: true,
    maxRetriesPerRequest: 3
}

const redis = new Redis(REDIS_URL, options)

redis.on("connect", () => console.log("edis connected"))
redis.on("error", (error) => console.error("Redis error:", error))

export default redis
