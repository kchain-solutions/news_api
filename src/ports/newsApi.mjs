import { store, retrieve } from '../adapters/secondary/cache.mjs'
import { queryWithoutPagination } from '../adapters/secondary/gNewsApi.mjs'
import { checkKeyword, checkMaxResults } from '../utils/searchParamsUtils.mjs'
import { filterResult as filterResultContents } from '../domains/newsApiContents.mjs'
import { filterResult as filterResultTitle } from '../domains/newsApiTitle.mjs'
import { NEWS_API_MAX_SIZE } from '../utils/environment.mjs'
import ArraySizeManipulation from '../utils/ArraySizeManipulation.mjs'


export default async function ({ q, maxResults, searchType }, context = { queryWithoutPagination, store, retrieve }) {
    try {
        q = checkKeyword(q)
        maxResults = maxResults ? checkMaxResults(maxResults) : NEWS_API_MAX_SIZE
        searchType = searchType ? searchType.toLowerCase() : 'content'

        const cacheKey = `${q}${searchType}`
        let res = []

        switch (searchType) {
            case 'content':
                res = await context.retrieve(cacheKey)
                if (!res) res = await context.queryWithoutPagination({ searchKey: q, searchField: "description,content" })
                res = filterResultContents(res, q)
                break
            case 'title':
                res = await context.retrieve(cacheKey)
                if (!res) res = await context.queryWithoutPagination({ searchKey: q, searchField: "title" })
                res = filterResultTitle(res, q)
                break
            default:
                res = await context.retrieve(cacheKey)
                if (!res) res = await context.queryWithoutPagination({ searchKey: q, searchField: "description,content" })
                res = filterResultContents(res, q)
                break
        }

        context.store(cacheKey, res)

        return ArraySizeManipulation(res, maxResults)
    } catch (error) {
        throw new Error(error)
    }
}