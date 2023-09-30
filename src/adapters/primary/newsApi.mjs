import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { NEWS_API_PORT } from '../../utils/environment.mjs'
import logConnection from '../../utils/logConnection.mjs'
import newsApiTitle from '../../ports/newsApi.mjs'


const app = express()


const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'News API Search',
            version: '0.1.0',
            description: 'Simple API to retreive data from GNEWS',
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Valerio Mellini",
                url: "https://kchain.solutions",
                email: "valerio@kchain.solutions",
            },

        },
        servers: [
            {
                url: `http://localhost:${NEWS_API_PORT}`,
            },
        ],
    },
    apis: ['./src/adapters/primary/newsApi.mjs'],
    tags: [{ name: 'Articles' }]
};

const specs = swaggerJsdoc(options);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs)
);



console.log(`newsApi listening on port ${NEWS_API_PORT}...`)

/**
 * @swagger
 * paths:
 *   /api/v1/search:
 *     get:
 *       tags:
 *         - Articles
 *       description: Get a list of articles that matches with search term
 *       parameters:
 *         - in: query
 *           name: q
 *           required: true
 *           description: Search query term
 *           schema:
 *             type: string
 *         - in: query
 *           name: search_type
 *           description: Type of search (either 'keyword' or 'title'). A 'keyword' search scans the content and description, while a 'title' search focuses solely on the article titles.
 *           schema:
 *             type: string
 *         - in: query
 *           name: max_results
 *           description: Maximum number of search results
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Successful response
 *         500:
 *           description: Internal server error
 */
app.get('/api/v1/search', async (req, res) => {
    try {
        logConnection(req)
        const response = await newsApiTitle({
            q: req.query.q,
            searchType: req.query.search_type,
            maxResults: req.query.max_results
        })
        res.status(200).send(response)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})


app.listen(NEWS_API_PORT)