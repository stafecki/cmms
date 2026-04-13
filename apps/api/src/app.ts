import { Hono } from 'hono'
import { connectMongo } from './lib/mongoose.js'
import redis from './lib/redis.js'
import auth from './modules/auth/auth.routes.js'
import machines from "./modules/machines/machines.routes.js";
import locations from "./modules/locations/locations.routes.js";
import workOrders from "./modules/work-orders/work-orders.routes.js";

const app = new Hono()

app.get('/', (c) => c.text('CMMS API'))
app.route('/auth', auth)
app.route('/machines', machines)
app.route('/locations', locations)
app.route('/work-orders', workOrders)

export const startDB = async (): Promise<void> => {
    await connectMongo()
    await redis.ping()
    console.log('All databases connected')
}

export default app
