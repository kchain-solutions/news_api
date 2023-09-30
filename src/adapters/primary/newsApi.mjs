import express from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { NEWS_API_PORT } from '../../utils/environment.mjs'
import logConnection from '../../utils/logConnection.mjs'
import newsApiTitle from '../../ports/newsApi.mjs'

const app = express()

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'NewsApi swagger documentation',
            version: '1.0.0',
        },
    },
    apis: ['./src/adapters/primary/*.mjs'],
    servers: [
        {
            url: `http://localhost:${NEWS_API_PORT}`,
        },
    ]
}
const specs = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))


console.log(`newsApi listening on port ${NEWS_API_PORT}...`)

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       params:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
app.get("/api/v1/search", async (req, res) => {
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
        res.status(400).send(error)
    }
})


app.listen(NEWS_API_PORT)