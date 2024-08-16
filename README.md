## Project Setup

1. Clone the repository
2. Run `npm install`
3. Install `goose` and `sqlc`
4. Setup .env file with database URL something like: `DATABASE_URL="postgres://postgres:postgres@localhost:5432/showtime"`
5. Run goose migration from `sql/schema` directory i.e `goose -dir sql/schema postgres "postgres://postgres:postgres@localhost:5432/showtime" up` (or down)
6. Run `sqlc generate` from root to generate the go code from the SQL queries this will generate typescript code in `src/generated` folder
7. run `npm start` to start the server

> [!NOTE]
> Step 3, 5, 6 is not required if not developing
> Install goose using [this](https://pressly.github.io/goose/installation/#linux)
> Install sqlc using [this](https://docs.sqlc.dev/en/stable/overview/install.html)
