# News API

This project is a simple example of API using a variant of hexagonal architecture.

## Caching

For simplicity, caching is managed internally within the application itself. For a more robust and scalable solution, a dedicated caching service like Redis is recommended.

## Pagination

Note that pagination is not supported, as it is not a feature available in the free tier of the GNews API.

## API Endpoints

The API exposes a GET method to search in the article title or in the content and description of the article.

## Architecture

This API is deployed using a [variation of Hexagonal architecture](https://medium.com/@daaru/lambda-hexagonal-architecture-variation-deb8612672cb).

## Testing the Application

To install the necessary dependencies, run:
```bash
npm install
```

To start the News API, execute:
```bash
npm run start:newsApi
```

To run unit tests:
```bash
npm run test
```

## API Documentation

After the application is up and running, the API documentation can be accessed via [Swagger UI](http://localhost:3000/api-docs).
