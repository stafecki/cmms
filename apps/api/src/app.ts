import { Hono } from 'hono'
import dotenv from 'dotenv'
import { connectMongo } from './lib/mongoose.js'
import redis from './lib/redis.js'
import auth from './modules/auth/auth.routes.js'

const app = new Hono()

app.get('/', (c) => c.text('CMMS API'))
app.route('/auth', auth)

export const startDB = async (): Promise<void> => {
    await connectMongo()
    await redis.ping()
    console.log('All databases connected')
}

export default app
