
# TMDB Middleware Service

TMDB Middleware Service is an Express application that acts as a middleware layer to handle requests to The Movie Database (TMDB) API.

## Installation

To install and run this application locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Running with Docker

To build and run the application with Docker, use the following commands:

1. Build the Docker image::
    ```sh
    docker-compose build
    ```

2. Start the Docker container:
    ```sh
    docker-compose up
    ```

The application will be accessible at http://localhost:3000.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`TMDB_API_KEY=your_tmdb_api_key`

`TMDB_API_URL=https://api.themoviedb.org/3`

`PORT=3000`


## Usage/Examples

To start the server, run the following command:
```sh
npm start
```

The server will listen on port 3000 (or the port specified in your .env file).
## API Reference

#### Searches for movies based on a query and a limit on the number of results.

```http
  GET /search
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `query` | `string` | **Required**. The search string for movies. |
| `limit` | `int` | **Required**. The limit for results. |

#### Get a merged list of 10 top rated movies with 10 popular movies.

```http
  GET /merge
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## License

This project is licensed under the MIT License.