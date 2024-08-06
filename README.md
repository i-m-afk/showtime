## Project Setup

1. Clone the repository
2. Run `npm install`
3. Install `goose` and `sqlc`
4. Setup .env file with database url somethinglike: `DATABASE_URL="postgres://postgres:postgres@localhost:5432/showtime"`
5. Run goose migration from `sql/schema` folder i.e `goose -dir sql/schema postgres "postgres://postgres:postgres@localhost:5432/showtime" up` (or down)
6. Run `sqlc generate` to generate the go code from the sql queries this will generate typescript code in `src/database` folder
7. run `npm start` to start the server
