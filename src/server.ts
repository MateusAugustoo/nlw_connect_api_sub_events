import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform
} from "fastify-type-provider-zod";
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { subscribeToEventRoute } from "./routes/subscribe-to-event-route";
import { env } from "./env";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: true,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW connect',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscribeToEventRoute)

app
  .listen({ port: env.PORT })
  .then(() => {
    console.log("Server is running on port 3333");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
