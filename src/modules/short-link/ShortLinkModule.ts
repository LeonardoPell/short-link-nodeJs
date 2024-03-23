
import fastifyServer from "../../server";
import ShortLinkController from "./ShortLinkController";
import ShortLinkService from "./ShortLinkService";
import PostgresShortLinkRepository from "./repository/PostgresShortLinkRepository";

const shortLinkRepository = new PostgresShortLinkRepository();
const shortLinkService = new ShortLinkService(shortLinkRepository)
const shortLinkController = new ShortLinkController(fastifyServer, shortLinkService);
shortLinkController.exportRoutes();