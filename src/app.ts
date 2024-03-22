import fastifyServer from "./server";
import './core/env';
import './routes';


fastifyServer.listen({port: Number(process.env.SERVER_PORT)}).then(() => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
})