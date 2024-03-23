import { uuid } from "uuidv4";

export default class ShortLink {
    private readonly id: string;

    private code: string;
    private url: string;
    private created_at: string;

    constructor(props: Omit<ShortLink, 'id' | 'created_at'>, id?: string){
        Object.assign(this,props);

        if(!id){
            this.id = uuid();
        }

        this.created_at = new Date().toISOString();
    }
}