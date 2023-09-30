import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

export function store(key, value) {

}

export function retrieve(key) {

}

export function remove(key) {

}