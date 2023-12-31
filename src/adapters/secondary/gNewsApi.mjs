import { GNEWS_ENDPOINT, GNEWS_APIKEY, APP_LANG } from "../../utils/environment.mjs"

/**
 * The query returns max 10 results
 * 
 * @param {Object} obj.searchKey 
 * @returns {Object} response
 */
export async function queryWithoutPagination({ searchKey, searchField }) {

    const searchParams = [
        ['q', searchKey],
        ['in', searchField],
        ['apikey', GNEWS_APIKEY],
        ['lang', APP_LANG]
    ]

    const path = '/api/v4/search'

    return await executeRequest(getEndpointUrl(path, searchParams), { method: 'GET' })
}


function getEndpointUrl(pathname, searchParams = []) {
    const url = new URL(GNEWS_ENDPOINT)

    url.pathname = pathname

    if (searchParams && searchParams.length > 0) {
        for (const elements of searchParams) {
            if (elements.length === 2 && elements.every(element => element !== null && element !== undefined)) {
                url.searchParams.append(elements[0], elements[1])
            }
        }
    }

    return url.toString()
}

async function executeRequest(url, options) {
    console.log(`gNews api request`)

    const res = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            'User-Agent': 'KChain Solutions'
        }
    })

    if (!res.ok) {
        throw new Error(`gNews API Response ${res.status} `)
    }

    const response = await res.text()
    console.log('gNews API', { status: res.status })

    try {
        JSON.parse(response)
    } catch (error) {
        throw new Error(`gNews API Error: ${error}`)
    }

    return JSON.parse(response)
}