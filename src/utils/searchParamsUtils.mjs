export function removeBlanks(s) {
    if (typeof s === 'string')
        return s.replaceAll(' ', '%20').trim()
    else
        throw new Error('Type error input has to be a string')
}

export function checkMaxResults(maxResults) {
    maxResults = Number(maxResults)
    if (maxResults > 0) {
        return maxResults
    }
    else
        throw new Error('Type error invalid maxResults parameter')
}