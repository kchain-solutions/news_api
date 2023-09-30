import { test, expect } from 'vitest'
import { filterResult } from "../../domains/newsApiKeywords.mjs"

import gNewsResponse from '../data/gNewsResponse.json'


test('It should filter responses by content and description', () => {
    const results = filterResult(gNewsResponse, "shelves%20lineup")
    expect(results.length).to.be.equal(2)
})
