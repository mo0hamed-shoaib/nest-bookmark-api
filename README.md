# Bookmark API

A RESTful API for managing bookmarks, built with NestJS and MongoDB. This project supports user authentication, bookmark CRUD operations, tag-based filtering, and robust validation.

## Features

- **User Authentication**: Register and log in with email and password. JWT-based authentication secures all bookmark endpoints.
- **Bookmark Management**: Create, read, update, and delete bookmarks. Each bookmark includes a URL, title, optional description, and tags.
- **Tag Filtering**: Retrieve bookmarks by tag for the authenticated user.
- **Timestamps**: Bookmarks include `createdAt` and `updatedAt` fields.
- **Validation**: All input is validated using TypeBox schemas and a custom validation pipe.

## Tech Stack

- [NestJS](https://nestjs.com/) (TypeScript framework)
- [MongoDB](https://www.mongodb.com/) (via Mongoose ODM)
- [Passport.js](http://www.passportjs.org/) (JWT authentication)
- [TypeBox](https://github.com/sinclairzx81/typebox) (DTO validation)
- [Jest](https://jestjs.io/) (testing)

## Project Structure

```
bookmark-api/
├── README.md                # Project documentation
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Dependency lock file
├── tsconfig.json            # TypeScript compiler configuration
├── tsconfig.build.json      # TypeScript build configuration
├── .gitignore               # Git ignore rules
├── .prettierrc              # Prettier code formatting configuration
├── eslint.config.mjs        # ESLint configuration
├── nest-cli.json            # NestJS CLI configuration
├── dist/                    # Compiled output (ignored in VCS)
├── node_modules/            # Installed dependencies
├── test/                    # End-to-end and test configuration
│   ├── app.e2e-spec.ts      # E2E test for the app
│   └── jest-e2e.json        # Jest E2E test config
└── src/                     # Application source code
    ├── main.ts              # Application entry point
    ├── app.module.ts        # Root module that imports all feature modules
    ├── auth/                # Authentication logic (JWT, guards, etc.)
    │   ├── auth.module.ts           # Auth module definition
    │   ├── auth.controller.ts       # Auth endpoints (register, login)
    │   ├── auth.service.ts          # Auth business logic (register, login, JWT)
    │   ├── jwt.strategy.ts          # JWT strategy for Passport
    │   └── jwt-auth.guard.ts        # Auth guard for protecting routes
    ├── user/                # User management logic
    │   ├── user.module.ts           # User module definition
    │   ├── user.controller.ts       # (Currently empty) User endpoints
    │   ├── user.service.ts          # User business logic (create, find)
    │   └── user.model.ts            # User Mongoose schema/model
    ├── Bookmark/            # Bookmark feature logic
    │   ├── bookmark.module.ts       # Bookmark module definition
    │   ├── constants.ts             # Bookmark module constants
    │   ├── controllers/             # Controllers for bookmark endpoints
    │   │   └── bookmark.controller.ts   # Bookmark CRUD and tag endpoints
    │   ├── dtos/                    # Data Transfer Objects (validation schemas)
    │   │   ├── index.ts
    │   │   ├── create-bookmark.dto.ts
    │   │   ├── update-bookmark.dto.ts
    │   │   └── bookmark-response.dto.ts
    │   ├── models/                  # Mongoose schemas/models for bookmarks
    │   │   └── bookmark.model.ts
    │   ├── pipes/                   # Custom validation pipes
    │   │   └── typebox-validation.pipe.ts
    │   ├── repositories/            # Data access layer for bookmarks
    │   │   └── bookmark.repository.ts
    │   └── services/                # Business logic for bookmarks
    │       └── bookmark.service.ts
    ├── Mongo/                # MongoDB connection logic
    │   ├── mongo.module.ts           # Custom MongoDB connection provider
    │   └── constants.ts              # MongoDB module constants
```

### Folder & File Explanations

- **README.md**: Project overview, setup, and usage instructions.
- **package.json / package-lock.json**: Project dependencies and scripts.
- **tsconfig\*.json**: TypeScript configuration files.
- **.gitignore, .prettierrc, eslint.config.mjs, nest-cli.json**: Tooling and configuration files.
- **dist/**: Compiled JavaScript output (auto-generated).
- **node_modules/**: Installed npm packages.
- **test/**: End-to-end tests and Jest configuration.
- **src/**: Main application source code.
  - **main.ts**: Application bootstrap file.
  - **app.module.ts**: Root module that wires together all feature modules.
  - **auth/**: Handles authentication (register, login, JWT, guards).
  - **user/**: User model, service, and (placeholder) controller.
  - **Bookmark/**: All bookmark-related logic, organized by responsibility:
    - **controllers/**: Route handlers for bookmark endpoints.
    - **dtos/**: Data validation and transfer objects.
    - **models/**: Mongoose schemas/models for bookmarks.
    - **pipes/**: Custom validation logic using TypeBox.
    - **repositories/**: Data access layer for bookmarks.
    - **services/**: Business logic for bookmarks.
    - **constants.ts**: Module-specific constants.
    - **bookmark.module.ts**: Module definition.
  - **Mongo/**: Custom MongoDB connection logic and constants.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or remote)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and set the following variables:

```
MONGO_URI=mongodb://localhost:27017/bookmark-api
JWT_SECRET=your_jwt_secret
```

### Running the Application

```bash
# development
npm run start

# watch mode
yarn start:dev

# production mode
npm run start:prod
```

### Running Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## API Overview

### Authentication

- `POST /auth/register` — Register a new user (email, password)
- `POST /auth/login` — Log in and receive a JWT token

### Bookmarks (all require JWT in `Authorization: Bearer <token>` header)

- `GET /bookmarks` — List all bookmarks for the authenticated user
- `GET /bookmarks/:id` — Get a specific bookmark by ID
- `GET /bookmarks/tags/:tagName` — List bookmarks by tag
- `POST /bookmarks` — Create a new bookmark
- `PATCH /bookmarks/:id` — Update a bookmark
- `DELETE /bookmarks/:id` — Delete a bookmark

## License

This project is licensed under the terms of the MIT license.
