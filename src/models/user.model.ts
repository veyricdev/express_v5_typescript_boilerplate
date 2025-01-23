import { type OpenAPIRegistry, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { Schema, model } from 'mongoose'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const UserSchema = z.object({
	_id: z.string(),
	userName: z.string().min(3).max(20),
	password: z.string().min(3).max(50),
	email: z.string().email(),
	giveName: z.string().min(3),
	phone: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export type User = z.infer<typeof UserSchema>

export const UserModel = model<User>(
	'user',
	new Schema<User>(
		{
			userName: { type: String, unique: true, trim: true },
			password: { type: String, unique: true, trim: true },
			email: { type: String, trim: true },
			giveName: { type: String, trim: true },
			phone: { type: String, trim: true },
		},
		{
			timestamps: true,
		}
	)
)

export const registerUserSchema = (registry: OpenAPIRegistry) => registry.register('User', UserSchema)
