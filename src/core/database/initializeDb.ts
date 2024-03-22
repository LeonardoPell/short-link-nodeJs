import DataBaseConnection from './DataBaseConnection';

async function initializeDb(){
    const database = new DataBaseConnection();
    await database.connect();
    const client = database.getClient();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS links (
                id VARCHAR(36) PRIMARY KEY,
                code VARCHAR(255) NOT NULL,
                url VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Table "links" created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        await database.disconnect();
    }
}

initializeDb();