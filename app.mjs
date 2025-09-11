import 'dotenv/config'
//import indexRouter from './routes/index.js'
import express from 'express';

import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';

import documents from "./docs.mjs";

const port = process.env.PORT || 1337;;
const app = express();

let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.jztcx09.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
//Middleware
app.use(cors());
app.use(morgan());

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

app.get('/:id', async (req, res) => {
    return res.render(
        "doc",
        { doc: await documents.getOne(req.params.id) }
    );
});

app.get('/', async (req, res) => {
    return res.render("index", { docs: await documents.getAll() });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
