import 'dotenv/config'

export const GNEWS_APIKEY = process.env.GNEWS_APIKEY
export const GNEWS_ENDPOINT = "https://gnews.io"
export const NEWSAPI_ENDPOINT = "http://localhost"
export const NEWS_API_PORT = 3000
export const NEWS_API_MAX_SIZE = 5
export const CACHE_TTL = 86400
export const APP_LANG = "en"

const envConstants = ['GNEWS_APIKEY']

envConstants.forEach((envConstant) => {
    const value = process.env[envConstant]
    if (value === undefined)
        throw new Error('Missing required environment variable: ' + envConstant)
});


