import { test, expect } from 'vitest'
import ArraySizeManipulation from '../../utils/ArraySizeManipulation.mjs'

test('Should return a correct subarray', () => {
    const a = [1, 2, 3, 4, 5, 6, 7]
    const res = ArraySizeManipulation(a, 5)
    expect(res.length).to.be.equal(5)
    expect(res[2]).to.be.equal(3)
})