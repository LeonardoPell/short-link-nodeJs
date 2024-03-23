import '../../../core/env';
import DataBaseConnection from "../../../core/database/DataBaseConnection";
import ShortLinkRepository from "./ShortLinkRepository";
import shortLinkInterface from '../entity/shortLink.interface';
import ShortLink from '../entity/ShortLink';

export default class PostgresShortLinkRepository implements ShortLinkRepository {

    async findAll(): Promise<shortLinkInterface[]>{
        const dataBase = new DataBaseConnection();

        try {
            await dataBase.connect();
            const client = dataBase.getClient();
            const query = `SELECT * FROM links;`;
            if(Boolean(process.env.DEBUGGER)){
                console.log(query);
            }
            const links = await client.query(query);
            return links.rows as shortLinkInterface[];
        } catch (error) {
            throw new Error(error as any);
        } finally {
            await dataBase.disconnect();
        }
    }

    async findByCode(code: string): Promise<shortLinkInterface> {
        const dataBase = new DataBaseConnection();

        try {
            await dataBase.connect();
            const client = dataBase.getClient();
            const query = `SELECT * FROM links WHERE code = '${code}';`;
            if(Boolean(process.env.DEBUGGER)){
                console.log(query);
            }
            const links = await client.query(query);
            return links.rows[0] as shortLinkInterface;
        } catch (error) {
            throw new Error(error as any);
        } finally {
            await dataBase.disconnect();
        }
    }

    async save(shortLink: ShortLink): Promise<ShortLink>{
        const dataBase = new DataBaseConnection();

        try {
            await dataBase.connect();
            const client = dataBase.getClient();
            const fields = Object.keys(shortLink);
            const values = Object.values(shortLink);
            const fieldNames = fields.join(', ');
            const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
            const query = `INSERT INTO links (${fieldNames}) VALUES (${placeholders}) RETURNING *`;

            if(Boolean(process.env.DEBUGGER)){
                console.log(query);
            }

            const link = await client.query(query,values);
            return link.rows[0];
        } catch (error) {
            throw new Error(error as any);
        } finally {
            await dataBase.disconnect();
        }
    }
}