import { GNEWS_ENDPOINT, GNEWS_APIKEY } from "../../utils/environment.mjs"

export default async function ({ searchKey }) {
    const searchParams = [
        ['q', searchKey],
        ['apikey', GNEWS_APIKEY],
    ]
    const path = '/search'

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

    return { response: JSON.parse(response), totalResults: res.headers.get('Total') }
}