import openDb from './db/database.mjs';
import database from './db/database.js';

const docs = {
    getAll: async function getAll() {
        // let db = await openDb();
        let db;

        try {
            // return await db.all('SELECT rowid as id, * FROM documents');

            db = await database.getDb();

            const result = await db.collection.find({}).toArray();

            return result;

        } catch (e) {
            console.error(e);

            return [];
        } finally {
            // await db.close();
            await db.client.close();
        }
    },

    getOne: async function getOne(id) {
        let db = await openDb();

        try {
            return await db.get('SELECT rowid as id, * FROM documents WHERE rowid=?', id);
        } catch (e) {
            console.error(e);

            return {};
        } finally {
            await db.close();
        }
    },

    addOne: async function addOne(body) {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.insertOne({
                title: body.title,
                content: body.content
            });

            return result;
           
        } catch (e) {
            console.error(e);
        } finally {
            await db.client.close();
        }
    },

    updateOne: async function updateOne(id, body) {
        let db = await openDb();

        try {
            return await db.run(
                'UPDATE documents SET title=?, content=? WHERE rowid=?',
                body.title,
                body.content,
                id
            );
        } catch (e) {
            console.error(e);
        } finally {
            await db.close();
        }
    }
};

export default docs;
