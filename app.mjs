import 'dotenv/config'

const port = process.env.PORT;

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';

import documents from "./docs.mjs";
import req from 'express/lib/request';
import { runInNewContext } from 'vm';

const app = express();

app.disable('x-powered-by');

app.set("view engine", "ejs");

app.use(express.static(path.join(process.cwd(), "public")));

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
    const result = await documents.addOne(req.body);

    return res.redirect(`/${result.lastID}`);
});

app.post("/update/:id", async (req, res) => {
    // Try updating document
    try {
        const result = await documents.updateOne(req.params.id, req.body);

        if (result) {
            // if exist, redirect to show document
            return res.redirect(`/${req.params.id}`);
        } else {
            // If not print error message
            return res.status(500).send("Update failed");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Database error during update");
    }

});

app.get('/:id', async (req, res) => {
    // fetch doc and store in var doc
    const doc = await documents.getOne(req.params.id);

    // check
    if (doc) {
        // if exists, render doc
        res.render("doc", { doc: doc });
    } else {
        // if !exists, print error messange
        res.status(404).send("Document not found");
    }
});

app.get('/', async (req, res) => {
    return res.render("index", { docs: await documents.getAll() });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
