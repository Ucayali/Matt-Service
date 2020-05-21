# Project Name

> Item Details Module

## Related Projects

  - https://github.com/Ucayali/recommended-service
  - https://github.com/Ucayali/Review-Service
  - https://github.com/Ucayali/Michael-Service
  - https://github.com/Ucayali/Matt-Proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

- `npm run build` Runs webpack in dev mode
- `npm run start` Starts nodemon listening on port 3002
- `npm run seed` Seed the database
- `npm run test` Runs jest tests

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## CRUD Operations

|   Verb    |        Endpoint       |            Action            |
|-----------| --------------------- | ---------------------------- |
| **POST**  |       /items/:id      |  CREATE a new item into DB   |
| **GET**   |       /items/:id      |  READ data and return it     |
| **PATCH** |       /items/:id      |  UPDATE item with new review |
| **DELETE**|       /items/:id      |  DELETE item based on URL ID |
