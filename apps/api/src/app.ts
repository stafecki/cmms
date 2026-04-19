import { Hono } from 'hono'
import { cors } from 'hono/cors' // 1. Importujemy middleware CORS
import { connectMongo } from './lib/mongoose.js'
import { requestLoggerMiddleware, errorLoggerMiddleware} from "./middleware/logger.middleware.js";
import redis from './lib/redis.js'
import auth from './modules/auth/auth.routes.js'
import machines from './modules/machines/machines.routes.js'
import locations from './modules/locations/locations.routes.js'
import workOrders from './modules/work-orders/work-orders.routes.js'
import inventory from './modules/inventory/inventory.routes.js'
import preventive from './modules/preventive/preventive.routes.js'
import notifications from './modules/notifications/notifications.routes.js'
import monitoring from "./modules/monitoring/monitoring.routes.js";

const app = new Hono()
app.use('*', cors())
app.use('*', requestLoggerMiddleware)

app.get('/', (c) => c.text('CMMS API'))
app.route('/auth', auth)
app.route('/machines', machines)
app.route('/locations', locations)
app.route('/work-orders', workOrders)
app.route('/inventory', inventory)
app.route('/preventive', preventive)
app.route('/notifications', notifications)
app.route('/monitoring', monitoring)

app.onError(errorLoggerMiddleware)

export const startDB = async (): Promise<void> => {
  await connectMongo()
  await redis.ping()
  console.log('All databases connected')
}

export default app
