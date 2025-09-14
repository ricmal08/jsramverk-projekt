/**
 * Connect to the database MongoDB.
 */

const mongo = require("mongodb").MongoClient;
const collectionName = "documents"


const database = {
    getDb: async function getDb() {
        let dsn = "mongodb://localhost:27017";
        let dbName = "docs"

        if (process.env.NODE_ENV === 'test') {
            dbName = "test";
        }

        try {
            const client  = await mongo.connect(dsn);
            const db = await client.db(dbName);
            const collection = await db.collection(collectionName);

            return {
                db: db,
                collection: collection,
                client: client,
            };
        } catch (error) {
            console.error("Database connection failed:", error);
            throw error;
        }    

    }
}

module.exports = database;