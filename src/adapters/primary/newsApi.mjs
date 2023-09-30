import express from 'express';

import { NEWS_API_PORT } from '../../utils/environment.mjs'
import logConnection from '../../utils/logConnection.mjs';

const app = express();
console.log(`newsApi listening on port ${NEWS_API_PORT}...`)

app.get("/title", (req, res) => {
    logConnection(req)

    try {
        res.send("title");
    } catch (error) {

    }

});

app.get("/keywords", (req, res) => {
    logConnection(req)

    try {
        res.send("keyword");
    } catch (error) {

    }

});



app.listen(NEWS_API_PORT);