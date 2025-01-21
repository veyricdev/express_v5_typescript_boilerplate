import { type OpenAPIRegistry, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const UserSchema = z.object({
	_id: z.number(),
	userName: z.string(),
	password: z.string(),
	email: z.string().email(),
	phone: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
})
export type User = z.infer<typeof UserSchema>

export const registerUserSchema = (registry: OpenAPIRegistry) => registry.register('User', UserSchema)
