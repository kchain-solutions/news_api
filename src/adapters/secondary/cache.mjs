import { CACHE_TTL } from '../../utils/environment.mjs';

import NodeCache from 'node-cache';
const client = new NodeCache();

export function store(key, value) {
    client.set(key, value, CACHE_TTL)
}

export function retrieve(key) {
    return client.get(key)
}