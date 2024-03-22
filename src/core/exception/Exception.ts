import httpStatus from "http-status";

export default class Exception extends Error {
    status: number;
    
    constructor(status: number, mensagem: string) {
        super(mensagem);
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}