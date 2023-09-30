import { store, retrieve } from '../adapters/secondary/cache.mjs'
import { query } from '../adapters/secondary/gNewsApi.mjs'
import { checkMaxResults, removeBlanks } from '../utils/searchParamsUtils.mjs'


export default async function ({ q, maxResults }, context = { query, store, retrieve }) {
    try {
        q = removeBlanks(q)
        maxResults = checkMaxResults(maxResults)

        let res = []
        res = await retrieve(q)
        if (!res) {
            res = "ciao cache"
            store(q, res)
        }
        return res
    } catch (error) {

    }
}