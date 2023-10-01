import { restoreBlanks, splitString } from "../utils/searchParamsUtils.mjs"

export function filterResult(responses, query) {
    if (Array.isArray(responses.articles)) {
        const q = restoreBlanks(query)
        const keywords = splitString(q)
        return responses.articles.filter(article => keywords.some(keyword => article.description.toLowerCase().includes(keyword) || article.content.toLowerCase().includes(keyword)))
    }
    else {
        throw new Error('Type error: not a valid response payload')
    }
}