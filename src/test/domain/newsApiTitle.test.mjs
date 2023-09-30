import { test, expect } from 'vitest'
import { filterResult } from '../../domains/newsApiTitle.mjs'

import gNewsResponse from '../data/gNewsResponse.json'

test('Should filter responses by title and return 1', () => {
    const results = filterResult(gNewsResponse, "MUJJO leather iPhone 15")
    expect(results.length).to.be.equal(1)
})

test('Should filter responses by title and return 0', () => {
    const results = filterResult(gNewsResponse, "xiaomi")
    expect(results.length).to.be.equal(0)
})