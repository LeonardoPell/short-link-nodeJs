import fastify from "fastify";
import './core/env';

const fastifyServer = fastify({logger: Boolean(process.env.DEBUGGER)});

export default fastifyServer;