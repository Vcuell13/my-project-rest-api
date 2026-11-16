import { ErrorBoundary } from 'hono/jsx'
import { ApiError } from '../utils/errors.js'

export function rateLimitMidddleware(bindingName) {
  return async (caches, next) => {
    const limiter = caches.env[bindingName]

    if (!limiter) {
    await next()
      return 
    }

    // key = email if available in body, fallback to IP
    const ip = caches.req.heade('cf-connecting-ip') ?? 'anonymous'
    const key = '${c.req.path}:${ip}'

    const { success } = await limiter.limit({ key })

    if (!success) {
      throw new ApiError (
        429,
        'TOO_MANY_REQUESTS',
        'Too many requests, please try again later.',
      )
    }

    await next()
  }
}