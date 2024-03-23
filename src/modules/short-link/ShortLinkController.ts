import '../../core/env';
import { FastifyInstance } from "fastify/types/instance";
import ShortLinkService from "./ShortLinkService";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import ReplyResponse from "../../core/replyResponse/ReplyResponse";
import httpStatus from "http-status";
import returnCatchExceptionController from "../../core/exception/returnCatchExecptionController";
import shortLinkInterface from './entity/shortLink.interface';

export default class ShortLinkController {

    constructor(
        private fastifyServer: FastifyInstance,
        private shortLinkService: ShortLinkService
    ){}

    private createNewLink(){
        this.fastifyServer.post(`/api/${process.env.API_VERSION}/link`, async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const body = request.body as shortLinkInterface;
                const serviceBody = await this.shortLinkService.createNewLink(body);

                const replyResponse = new ReplyResponse<typeof serviceBody>
                (httpStatus.CREATED,httpStatus[`${httpStatus.CREATED}_NAME`],'Link was created', serviceBody);
                return reply.code(httpStatus.CREATED).send(replyResponse);
            } catch (error) {
                return returnCatchExceptionController(error,reply);
            }
        });
    }

    private redirectToLink(){
        this.fastifyServer.get(`/:code`, async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const { code } = request.params as { code: string };
                const serviceBody = await this.shortLinkService.getLinkByCode(code);

                return reply.redirect(serviceBody.url);
            } catch (error) {
                return returnCatchExceptionController(error,reply);
            }
        });
    }

    private getAllLinks(){
        this.fastifyServer.get(`/api/${process.env.API_VERSION}/link`, async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const serviceBody = await this.shortLinkService.getAllLinks();

                const replyResponse = new ReplyResponse<typeof serviceBody>
                (httpStatus.OK,httpStatus[`${httpStatus.OK}_NAME`],'All link were found', serviceBody);
                return reply.code(httpStatus.OK).send(replyResponse);
            } catch (error) {
                return returnCatchExceptionController(error,reply);
            }
        });
    }

    private getLinkByCode(){
        this.fastifyServer.get(`/api/${process.env.API_VERSION}/link/:code`, async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const { code } = request.params as { code: string };
                const serviceBody = await this.shortLinkService.getLinkByCode(code);

                const replyResponse = new ReplyResponse<typeof serviceBody>
                (httpStatus.OK,httpStatus[`${httpStatus.OK}_NAME`],`Link whith code ${code} was found`, serviceBody);
                return reply.code(httpStatus.OK).send(replyResponse);
            } catch (error) {
                return returnCatchExceptionController(error,reply);
            }
        });
    }


    public exportRoutes(): void {
        this.getAllLinks();
        this.getLinkByCode();
        this.redirectToLink();
        this.createNewLink();
    }

}