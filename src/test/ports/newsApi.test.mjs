import { test, vi, expect } from "vitest"
import * as cache from "../../adapters/secondary/cache.mjs"
import * as gNewsApi from "../../adapters/secondary/gNewsApi.mjs"
import newsApi from "../../ports/newsApi.mjs"

import gNewsResponse from "../data/gNewsResponse.json"


test('It should test title search ', async () => {
    vi.spyOn(gNewsApi, 'queryWithoutPagination').mockImplementation(async ({ searchkey }) => (gNewsResponse))

    const response = await newsApi({
        q: "MUJJO leather iPhone 15",
        searchType: "title",
        maxResults: 5
    }, {
        queryWithoutPagination: gNewsApi.queryWithoutPagination,
        store: cache.store,
        retrieve: cache.retrieve
    })

    expect(response.length).to.be.equal(1)
})


test('It should test keyword search ', async () => {
    vi.spyOn(gNewsApi, 'queryWithoutPagination').mockImplementation(async ({ searchkey }) => (gNewsResponse))

    const response = await newsApi({
        q: "shelves%20lineup",
        searchType: "keyword",
        maxResults: 5
    }, {
        queryWithoutPagination: gNewsApi.queryWithoutPagination,
        store: cache.store,
        retrieve: cache.retrieve
    })

    expect(response.length).to.be.equal(2)
})


test('It should test cache ', async () => {
    vi.spyOn(cache, 'retrieve').mockImplementation((key) => (gNewsResponse))

    const response = await newsApi({
        q: "shelves%20lineup",
        searchType: "keyword",
        maxResults: 5
    }, {
        queryWithoutPagination: gNewsApi.queryWithoutPagination,
        store: cache.store,
        retrieve: cache.retrieve
    })

    expect(response.length).to.be.equal(2)
})