import 'dotenv/config'
import app, { startDB } from './app.js'
import { serve } from '@hono/node-server'
import cron from 'node-cron'
import { checkAndCreatePreventiveOrders } from './modules/preventive/preventive.service.js'

const PORT = Number(process.env.PORT) || 3000

const bootstrap = async (): Promise<void> => {
  await startDB()

  cron.schedule('0 * * * *', async () => {
    console.log('Running preventive check...')
    const created = await checkAndCreatePreventiveOrders()
    console.log(`Created ${created} preventive work orders`)
  })

  serve(
    {
      fetch: app.fetch,
      port: PORT
    },
    (info) => {
      console.log(`Server running at http://localhost:${info.port}`)
    }
  )
}

bootstrap()
