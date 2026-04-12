import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"
import type { Context, Next } from "hono"
import type { UserRole } from "../../generated/prisma/client.js"
import type { AuthVariables, JwtPayload } from "./auth.middleware.js"

export const requireRoles = (...roles: UserRole[]) => {
    return createMiddleware<AuthVariables>(
        async (c: Context<AuthVariables>, next: Next): Promise<void> => {
            const user: JwtPayload = c.get("user")

            if (!user) {
                throw new HTTPException(401, { message: "Unauthorized" })
            }

            if (!roles.includes(user.role)) {
                throw new HTTPException(403, {
                    message: `Access denied. Required roles: ${roles.join(", ")}`
                })
            }

            await next()
        }
    )
}
