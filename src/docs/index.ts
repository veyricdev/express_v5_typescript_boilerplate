import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'
import { registerUserSchema } from '~/models/user.model'
import { errorsRegisterPath } from '~/routes/errors'

export function generateOpenAPIDocument() {
	const registry = new OpenAPIRegistry()

	// Register definitions here
	registerUserSchema(registry)
	errorsRegisterPath(registry)

	const generator = new OpenApiGeneratorV3(registry.definitions)

	return generator.generateDocument({
		openapi: '3.0.0',
		info: {
			version: '1.0.0',
			title: 'Swagger API',
			description: 'This is the API for Express V5 Boilerplate',
		},
	})
}
