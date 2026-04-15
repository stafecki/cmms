import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '@hono/zod-validator'
import {
  register,
  login,
  logout,
  refreshTokens,
  getMe
} from './auth.service.js'
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema
} from './auth.schema.js'
import {
  authMiddleware,
  type AuthVariables
} from '../../middleware/auth.middleware.js'

const auth = new Hono<{ Variables: AuthVariables['Variables'] }>()

auth.post('/register', zValidator('json', registerSchema), async (c) => {
  const input = c.req.valid('json')
  const result = await register(input)
  return c.json(result, 201)
})

auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const input = c.req.valid('json')
  const result = await login(input)
  return c.json(result, 200)
})

auth.post('/logout', authMiddleware, async (c) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    throw new HTTPException(401, { message: 'Missing Authorization header' })
  }
  const token = authHeader.split(' ')[1]
  await logout(token)
  return c.json({ message: 'Logged out successfully' }, 200)
})

auth.post('/refresh', zValidator('json', refreshTokenSchema), async (c) => {
  const input = c.req.valid('json')
  const tokens = await refreshTokens(input)
  return c.json(tokens, 200)
})

auth.get('/me', authMiddleware, async (c) => {
  const user = c.get('user')
  const result = await getMe(user.sub)
  return c.json(result, 200)
})

export default auth
