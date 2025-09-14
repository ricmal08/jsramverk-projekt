import database from './db/database.js';
import { ObjectId } from 'mongodb';

const docs = {
    getAll: async function getAll() {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.find({}).toArray();

            return result;

        } catch (e) {
            console.error(e);

            return [];
        } finally {
            await db.client.close();
        }
    },

    getOne: async function getOne(id) {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.findOne({ _id: new ObjectId(id) });
            return result;
        } catch (e) {
            console.error(e);

            return {};
        } finally {
            await db.client.close();
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
        let db;

        try {
            db = await database.getDb();

            const filter = { _id: new ObjectId(id) };

            const updateDoc = {
                $set: {
                    title: body.title,
                    content: body.content
                }
            };

            const result = await db.collection.updateOne(filter, updateDoc);

            return result;
        } catch (e) {
            console.error(e);
        } finally {
            await db.client.close();
        }
    }
};

export default docs;
