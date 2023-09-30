import express from 'express';

import { NEWS_API_PORT } from '../../utils/environment.mjs'
import logConnection from '../../utils/logConnection.mjs';

const app = express();
console.log(`newsApi listening on port ${NEWS_API_PORT}...`)

app.get("/author", (req, res) => {
    logConnection(req)
    res.send("hello");
});



app.listen(NEWS_API_PORT);