import { store, retrieve } from '../adapters/secondary/cache.mjs'
import { queryWithoutPagination } from '../adapters/secondary/gNewsApi.mjs'
import { checkKeyword, checkMaxResults } from '../utils/searchParamsUtils.mjs'
import { filterResult as filterResultKeyword } from '../domains/newsApiKeywords.mjs'
import { filterResult as filterResultTitle } from '../domains/newsApiTitle.mjs'
import ArraySizeManipulation from '../utils/ArraySizeManipulation.mjs'


export default async function ({ q, maxResults, searchType }, context = { queryWithoutPagination, store, retrieve }) {
    try {
        q = checkKeyword(q)
        maxResults = checkMaxResults(maxResults)
        searchType = searchType ? searchType.toLowerCase() : 'keyword'

        const cacheKey = `${q}${searchType}`
        let res = []

        res = await context.retrieve(cacheKey)
        if (!res) {
            res = await context.queryWithoutPagination({ searchKey: q })
            context.store(cacheKey, res)
        }

        switch (searchType) {
            case 'keyword':
                res = filterResultKeyword(res, q)
                break
            case 'title':
                res = filterResultTitle(res, q)
                break
            default:
                res = filterResultKeyword(res, q)
                break
        }

        return ArraySizeManipulation(res, maxResults)
    } catch (error) {
        throw new Error(error)
    }
}