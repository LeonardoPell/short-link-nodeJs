import httpStatus from "http-status";
import ReplyResponse from "../replyResponse/ReplyResponse";
import { FastifyReply } from "fastify/types/reply";

export default function returnCatchExceptionController(error: any, reply: FastifyReply){

    if(Boolean(process.env.DEBUGGER)){
        console.log(error);
    }

    if(
        error?.status &&
        error?.message
    ){
        const replyResponse = new ReplyResponse<null>(error.status, error.status, error.message, null);
        return reply.code(error.status).send(replyResponse);
    }

    const replyResponse = new ReplyResponse<null>(httpStatus.INTERNAL_SERVER_ERROR, httpStatus[`${httpStatus.INTERNAL_SERVER_ERROR}_NAME`], 'Some unexpected error happened', null);
    return reply.code(httpStatus.INTERNAL_SERVER_ERROR).send(replyResponse);
}