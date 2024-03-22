import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import httpStatus from "http-status";
import ReplyResponse from "../../core/replyResponse/ReplyResponse";

export default class HelloWorldController{

    constructor(private fastifyServer: FastifyInstance){}

    private getHelloWorld(){
        this.fastifyServer.get('/', (request: FastifyRequest, reply: FastifyReply) => {
            const replyResponse = new ReplyResponse<null>
                (httpStatus.OK,httpStatus[`${httpStatus.OK}_NAME`],'Hello World', null);
            return reply.code(httpStatus.OK).send(replyResponse);
        });
    }

    public exportRoutes(): void{
        this.getHelloWorld();
    }
}