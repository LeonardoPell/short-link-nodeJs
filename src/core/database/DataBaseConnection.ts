import '../../core/env';
import { Client } from 'pg';

export default class DataBaseConnection{
    private clienteConfig = {
      user: String(process.env.DB_USER),
      host: String(process.env.DB_HOST),
      database: String(process.env.DB_NAME),
      password: String(process.env.DB_PASSWORD),
      port: Number(process.env.DB_PORT),
    };

    private client: Client;

    constructor() {
      this.client = new Client(this.clienteConfig)
      console.log(this.clienteConfig);
    }
    
      async connect(): Promise<void> {
        await this.client.connect();
        console.log('DataBase connected');
      }
        
      async disconnect(): Promise<void> {
        await this.client.end();
        console.log('DataBase disconnected');
      }

      public getClient(){
        return this.client;
      }
}