import httpStatus from "http-status";
import Exception from "../../core/exception/Exception";
import ShortLinkRepository from "./repository/ShortLinkRepository";
import returnCatchException from "../../core/exception/returnCatchExecption";
import ShortLink from "./entity/ShortLink";
import shortLinkInterface from "./entity/shortLink.interface";

export default class ShortLinkService {

    constructor(private shortLinkRepository: ShortLinkRepository){}

    async getAllLinks(): Promise<shortLinkInterface[]>{
        try {
            const shortLinks = await this.shortLinkRepository.findAll();

            if(!shortLinks.length){
                throw new Exception(httpStatus.NOT_FOUND, 'No link was found');
            }

            return shortLinks;

        } catch (error) {
            throw returnCatchException(error);
        }
    }

    async getLinkByCode(code: string): Promise<shortLinkInterface>{
        try {
            const shortLinks = await this.shortLinkRepository.findByCode(code);

            if(!shortLinks){
                throw new Exception(httpStatus.NOT_FOUND, `No link whith code ${code} was found`);
            }

            return shortLinks;

        } catch (error) {
            throw returnCatchException(error);
        }
    }

    async createNewLink(body: shortLinkInterface): Promise<ShortLink>{
        try {
            const newShortLink = new ShortLink(body);
            const shortLinkResponse = await this.shortLinkRepository.save(newShortLink);

            return shortLinkResponse;
        } catch (error) {
            throw returnCatchException(error);
        }
    }

}