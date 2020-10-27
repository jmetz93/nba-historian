# nba-historian

This is an early version of the NBA Historian, an application that leverages the [balldontlie API](https://www.balldontlie.io/#introduction), which gives access to a modest amount of NBA information. In this application you can search for players by name, view more details on a specific player by clicking one of the results you get, and then if applicable based on the player, you can get their statistics from the 2019-2020 NBA season. The app also provides the available information on all 30 NBA teams that is in the balldontlie database. There currently is user authentication as well through creating an account with a username and password.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)


## API Features

- **ES9**: latest ECMAScript features
- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: using [sonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- **Token Blacklisting** using [Redis](
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io) (for auth routes only, ballDontlie routes coming soon)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) (for auth routes only, balldontlieroutes coming soon)
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Dependency management**: with [npm](https://www.npmjs.com/)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)

## Getting Started

**REQUIRED: Mongodb installed locally and have it running**


### Installation

Clone the repo:

```bash
git clone https://github.com/jmetz93/nba-historian
cd nba-historian
```

Install api dependencies:

```bash
cd api
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
# can leave PORT, JWT_ACCESS_EXPIRATION_MINUTES, JWT_REFRESH_EXPIRATION_DAYS as is
# need to replace '{name-of-db-here}' with an actual database name for MONGODB_URL
# can leave JWT_ACCESS_SECRET and JWT_REFRESH_SECRET as is for local work, but should generate something much more secure for production
```

Install client dependencies:

```bash
cd .. # if still in api directory
cd client
npm install
```

### Commands

Running locally:

```bash
cd api
npm run dev
```

Open new terminal window for client:

```
cd client
npm start
```

Running api in production:

```bash
cd api
npm start
```

## Project Structure

```
api\        # Folder where api is housed
client\     # Folder where frontend is housed
```

### API Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```



