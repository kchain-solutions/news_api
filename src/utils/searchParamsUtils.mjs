export function checkKeyword(s) {
    if (s && typeof s === 'string')
        return s.trim().toLowerCase()
    else
        throw new Error('Type error input has to be a string')
}

export function restoreBlanks(s) {
    if (s && typeof s === 'string')
        return s.replaceAll('%20', ' ').trim().toLowerCase()
    else
        throw new Error('Type error input has to be a string')
}

export function splitString(s) {
    if (s && typeof s === 'string')
        return s.split(' ').map(el => el.toLowerCase().trim())
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