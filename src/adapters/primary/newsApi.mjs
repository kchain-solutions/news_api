import express from 'express';

import { NEWS_API_PORT } from '../../utils/environment.mjs'
import logConnection from '../../utils/logConnection.mjs';
import newsApiTitle from '../../ports/newsApiTitle.mjs';

const app = express();
console.log(`newsApi listening on port ${NEWS_API_PORT}...`)

app.get("/title", async (req, res) => {
    try {
        logConnection(req);
        const response = await newsApiTitle({ q: req.query.q, maxResults: req.query.max_results });
        res.send(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/keywords", (req, res) => {
    logConnection(req)

    try {
        res.send("keyword")
    } catch (error) {

    }

});



app.listen(NEWS_API_PORT);