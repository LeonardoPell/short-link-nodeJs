export default class ReplyResponse<BodyReply>{
    private statusCode: number;
    private status: string;
    private message: string;
    private body: BodyReply

    constructor(statusCode: number, status: string, message: string, body: BodyReply){
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        this.body = body;
    }
}