import ShortLink from "../entity/ShortLink";
import shortLinkInterface from "../entity/shortLink.interface";

export default interface ShortLinkRepository {
    findAll(): Promise<shortLinkInterface[]>;
    findByCode(code: string): Promise<shortLinkInterface>;
    save(shortLink: ShortLink): Promise<ShortLink>;
} 