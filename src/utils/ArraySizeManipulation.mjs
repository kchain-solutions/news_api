import { NEWS_API_MAX_SIZE } from "./environment.mjs";


export default function (array, maxSize = NEWS_API_MAX_SIZE) {
    if (Array.isArray(array)) {
        if (array.length < maxSize) return array
        else return array.splice(0, maxSize)
    }
    else {
        throw new Error('Type error. Invalid array input')
    }
}