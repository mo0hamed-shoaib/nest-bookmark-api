# Bookmark API

A RESTful API for managing bookmarks, built with NestJS and MongoDB. This project supports user authentication, bookmark CRUD operations, tag-based filtering, and robust validation with a clean, modular architecture.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **🔐 User Authentication**: Secure registration and login with email/password credentials
- **🔑 JWT-based Security**: Token-based authentication protecting all bookmark endpoints
- **📚 Full CRUD Operations**: Complete bookmark management (Create, Read, Update, Delete)
- **🏷️ Tag System**: Organize and filter bookmarks by custom tags
- **⏰ Automatic Timestamps**: Track creation and modification times
- **✅ Input Validation**: Comprehensive validation using TypeBox schemas
- **🏗️ Modular Architecture**: Clean separation of concerns with NestJS modules
- **📊 RESTful Design**: Standard HTTP methods and status codes

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) - Progressive Node.js framework
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Authentication**: [Passport.js](http://www.passportjs.org/) with JWT strategy
- **Validation**: [TypeBox](https://github.com/sinclairzx81/typebox) for schema validation
- **Testing**: [Jest](https://jestjs.io/) for unit and integration tests
- **Language**: TypeScript for type safety and better development experience

## 🏗️ Architecture Overview

### Module And File Dependency Graph
<div align="center">
  <img src="https://i.postimg.cc/1tXcX44Y/Module-and-File-Dependency-Graph.png" alt="Module and File Dependency Graph" width="800" height="600">
</div>

*Visual representation of how modules depend on each other, showing the relationships between Auth, User, Bookmark, and Mongo modules.*

### API Endpoint Flow (Sequence Diagram)
<div align="center">
  <img src="https://i.postimg.cc/43BQXp49/API-Endpoint-Flow-Sequence-Diagram.png" alt="API Endpoint Flow Sequence Diagram" width="800" height="600">
</div>

*Sequence diagram showing the flow of operations for typical API calls, including authentication flow and bookmark operations.*

### Database Schema (ER Diagram)
<div align="center">
  <img src="https://i.postimg.cc/8zdbnqqw/Database-Schema-ER-Diagram.png" alt="Database Schema ER Diagram" width="400" height="800">
</div>

*Entity relationship diagram displaying the relationships between Users and Bookmarks, including field definitions and constraints.*

### Request Lifecycle (Flowchart)
<div align="center">
  <img src="https://i.postimg.cc/ZqTLkwmm/Request-Lifecycle-Flowchart.png" alt="Request Lifecycle Flowchart" width="400" height="800">
</div>

*Complete request lifecycle flowchart from incoming HTTP request to response, including middleware, guards, validation, and database operations.*

### Service Interaction Diagram
<div align="center">
  <img src="https://i.postimg.cc/j5167K7q/Service-Interaction-Diagram.png" alt="Service Interaction Diagram" width="1200" height="500">
</div>

*Diagram showing how different services interact with each other, including AuthService, UserService, BookmarkService, and Repository layers.*

## 📁 Project Structure

```
bookmark-api/
├── 📄 README.md                # Project documentation
├── 📦 package.json             # Project metadata and dependencies
├── 🔒 package-lock.json        # Dependency lock file
├── ⚙️ tsconfig.json            # TypeScript compiler configuration
├── ⚙️ tsconfig.build.json      # TypeScript build configuration
├── 🚫 .gitignore               # Git ignore rules
├── 💅 .prettierrc              # Prettier code formatting configuration
├── 📏 eslint.config.mjs        # ESLint configuration
├── ⚙️ nest-cli.json            # NestJS CLI configuration
├── 📁 dist/                    # Compiled output (ignored in VCS)
├── 📁 node_modules/            # Installed dependencies
├── 🧪 test/                    # End-to-end and test configuration
│   ├── app.e2e-spec.ts         # E2E test for the app
│   └── jest-e2e.json           # Jest E2E test config
└── 📁 src/                     # Application source code
    ├── 🚀 main.ts              # Application entry point
    ├── 🏠 app.module.ts        # Root module that imports all feature modules
    ├── 🔐 auth/                # Authentication logic (JWT, guards, etc.)
    │   ├── auth.module.ts           # Auth module definition
    │   ├── auth.controller.ts       # Auth endpoints (register, login)
    │   ├── auth.service.ts          # Auth business logic (register, login, JWT)
    │   ├── jwt.strategy.ts          # JWT strategy for Passport
    │   └── jwt-auth.guard.ts        # Auth guard for protecting routes
    ├── 👤 user/                # User management logic
    │   ├── user.module.ts           # User module definition
    │   ├── user.controller.ts       # User endpoints
    │   ├── user.service.ts          # User business logic (create, find)
    │   └── user.model.ts            # User Mongoose schema/model
    ├── 📚 Bookmark/            # Bookmark feature logic
    │   ├── bookmark.module.ts       # Bookmark module definition
    │   ├── constants.ts             # Bookmark module constants
    │   ├── 🎮 controllers/         # Controllers for bookmark endpoints
    │   │   └── bookmark.controller.ts   # Bookmark CRUD and tag endpoints
    │   ├── 📋 dtos/                # Data Transfer Objects (validation schemas)
    │   │   ├── index.ts
    │   │   ├── create-bookmark.dto.ts
    │   │   ├── update-bookmark.dto.ts
    │   │   └── bookmark-response.dto.ts
    │   ├── 🗄️ models/              # Mongoose schemas/models for bookmarks
    │   │   └── bookmark.model.ts
    │   ├── 🔧 pipes/               # Custom validation pipes
    │   │   └── typebox-validation.pipe.ts
    │   ├── 💾 repositories/        # Data access layer for bookmarks
    │   │   └── bookmark.repository.ts
    │   └── ⚡ services/            # Business logic for bookmarks
    │       └── bookmark.service.ts
    └── 🍃 Mongo/               # MongoDB connection logic
        ├── mongo.module.ts          # Custom MongoDB connection provider
        └── constants.ts             # MongoDB module constants
```

### 📖 Folder & File Explanations

#### Configuration Files
- **README.md**: Comprehensive project documentation
- **package.json**: Dependencies, scripts, and project metadata
- **tsconfig\*.json**: TypeScript compilation settings
- **Configuration files** (`.gitignore`, `.prettierrc`, etc.): Development tooling setup

#### Core Application (`src/`)
- **main.ts**: Application bootstrap and server initialization
- **app.module.ts**: Root module orchestrating all feature modules

#### Feature Modules
- **auth/**: Complete authentication system
  - JWT token generation and validation
  - User registration and login endpoints
  - Route protection guards
  
- **user/**: User management functionality
  - User model and database operations
  - User-related business logic
  
- **Bookmark/**: Core bookmark functionality (organized by layers)
  - **controllers/**: HTTP request handlers and routing
  - **dtos/**: Data validation and transfer schemas
  - **models/**: Database schema definitions
  - **pipes/**: Custom validation middleware
  - **repositories/**: Data access abstraction layer
  - **services/**: Business logic implementation

- **Mongo/**: Database connectivity
  - MongoDB connection configuration
  - Database-related constants and utilities

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (LTS recommended)
- **MongoDB** instance (local installation or cloud service like MongoDB Atlas)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookmark-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/bookmark-api
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d
   
   # Application Configuration
   PORT=3000
   NODE_ENV=development
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   # Using MongoDB service
   sudo systemctl start mongod
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

### Running the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Standard development mode
npm run start
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### 🔐 Authentication Endpoints

#### Register User
- **POST** `/auth/register`
- **Body**: `{ "email": "user@example.com", "password": "securePassword" }`
- **Response**: `{ "message": "User registered successfully" }`

#### Login User
- **POST** `/auth/login`
- **Body**: `{ "email": "user@example.com", "password": "securePassword" }`
- **Response**: `{ "access_token": "jwt_token_here" }`

### 📚 Bookmark Endpoints

> **Note**: All bookmark endpoints require JWT authentication via `Authorization: Bearer <token>` header

#### List All Bookmarks
- **GET** `/bookmarks`
- **Response**: Array of bookmark objects

#### Get Bookmark by ID
- **GET** `/bookmarks/:id`
- **Response**: Single bookmark object

#### Get Bookmarks by Tag
- **GET** `/bookmarks/tags/:tagName`
- **Response**: Array of bookmarks with the specified tag

#### Create Bookmark
- **POST** `/bookmarks`
- **Body**: 
  ```json
  {
    "url": "https://example.com",
    "title": "Example Site",
    "description": "Optional description",
    "tags": ["web", "example"]
  }
  ```

#### Update Bookmark
- **PATCH** `/bookmarks/:id`
- **Body**: Partial bookmark object with fields to update

#### Delete Bookmark
- **DELETE** `/bookmarks/:id`
- **Response**: `{ "message": "Bookmark deleted successfully" }`

### 📊 Response Format

#### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully"
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": { /* additional error context */ }
  }
}
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run start:dev      # Start with hot reload
npm run start:debug    # Start with debugging enabled

# Building
npm run build          # Compile TypeScript to JavaScript
npm run start:prod     # Run production build

# Code Quality
npm run lint           # Run ESLint
npm run format         # Format code with Prettier

# Testing
npm run test           # Unit tests
npm run test:watch     # Unit tests in watch mode
npm run test:e2e       # End-to-end tests
npm run test:cov       # Test coverage report
```

### Development Guidelines

- Follow the established modular architecture
- Write unit tests for all services and controllers
- Use TypeBox for DTO validation
- Follow NestJS best practices and conventions
- Maintain consistent code formatting with Prettier
- Use meaningful commit messages

## 🧪 Testing

### Unit Tests
```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov
```

### End-to-End Tests
```bash
# Run E2E tests
npm run test:e2e
```

### Test Structure
- Unit tests are located alongside source files (`*.spec.ts`)
- E2E tests are in the `test/` directory
- Test coverage reports are generated in `coverage/` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and architecture
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using NestJS and TypeScript**
