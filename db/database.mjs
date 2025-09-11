import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
    let dbFilename = `./db/docs.sqlite`;

    if (process.env.NODE_ENV === 'test') {
        dbFilename = "./db/test.sqlite";
    }

    return await open({
        filename: dbFilename,
        driver: sqlite3.Database
    });
}

//mongodb+srv://ricmal_db_user:SrsO7dDouCan82L2@cluster0.jztcx09.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
export default openDb;
