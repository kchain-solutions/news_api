export default function (s) {
    if (typeof s === 'string')
        return s.replaceAll(' ', '%20').trim()
    else
        throw new Error('Type error input has to be a string')
}