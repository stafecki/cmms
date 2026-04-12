import 'dotenv/config'
import app, { startDB } from './app.js'
import { serve } from '@hono/node-server'

const PORT = Number(process.env.PORT) || 3000

const bootstrap = async (): Promise<void> => {
    await startDB()

    serve({
        fetch: app.fetch,
        port: PORT
    }, (info) => {
        console.log(`Server running at http://localhost:${info.port}`)
    })
}

bootstrap()
