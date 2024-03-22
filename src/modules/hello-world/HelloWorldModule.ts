import HelloWorldController from "./HelloWorldController";
import fastifyServer from "../../server";

const helloWorldController = new HelloWorldController(fastifyServer);
helloWorldController.exportRoutes();