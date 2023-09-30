import { restoreBlanks } from "../utils/searchParamsUtils.mjs"

export function filterResult(responses, query) {
    if (Array.isArray(responses.articles)) {
        const q = restoreBlanks(query)
        return responses.articles.filter(article => article.title.toLowerCase().includes(q))
    }
    else {
        throw new Error('Type error: not a valid response payload')
    }
}