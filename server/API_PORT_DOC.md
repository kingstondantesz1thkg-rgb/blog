# MyBlog Server API And Port Doc

## 1. Server Overview
- Server directory: `C:\Users\win10pro\myblog\server`
- Default port: `4000`
- Base URL: `http://localhost:4000`
- API base path: `http://localhost:4000/api`
- Current implementation supports:
  - Admin login with JWT
  - Posts CRUD
  - Experiences CRUD
  - Health check
- Database mode:
  - If `MONGODB_URI` is configured and MongoDB is reachable, the server uses MongoDB via Mongoose
  - If `MONGODB_URI` is missing or connection fails, the server falls back to in-memory mode for development/testing

## 2. Start The Server
Because the current PowerShell environment may block `npm.ps1`, the most stable local command is:

```powershell
node src/server.js
```

If your local shell allows npm scripts, you can also use:

```powershell
npm start
```

## 3. Environment Variables
Reference file: `.env.example`

```env
PORT=4000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=change-this-jwt-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
# MONGODB_URI=mongodb://127.0.0.1:27017/myblog
```

## 4. Implemented Endpoints

### 4.1 Health
#### `GET /api/health`
Returns current server status.

Response example:

```json
{
  "status": "ok",
  "mode": "memory",
  "dbConnected": false,
  "uptime": 13.94,
  "timestamp": "2026-05-19T14:52:41.016Z"
}
```

### 4.2 Auth
#### `POST /api/auth/login`
Request body:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response example:

```json
{
  "token": "jwt-token",
  "message": "Login successful."
}
```

### 4.3 Posts
#### `GET /api/posts?page=1&limit=10&category=Backend`
Returns paginated posts list.

Response shape:

```json
{
  "total": 2,
  "data": [],
  "page": 1,
  "limit": 10
}
```

#### `GET /api/posts/:id`
Returns single post detail.

#### `POST /api/posts`
Requires `Authorization: Bearer <token>`.

Request body:

```json
{
  "title": "API Test Post",
  "content": "created during port test",
  "summary": "optional summary",
  "category": "Testing",
  "tags": ["api", "test"],
  "coverImage": "",
  "isPublished": true
}
```

#### `PUT /api/posts/:id`
Requires `Authorization: Bearer <token>`.
Supports partial updates.

#### `DELETE /api/posts/:id`
Requires `Authorization: Bearer <token>`.

### 4.4 Experiences
#### `GET /api/experiences`
Returns experiences list sorted by `sortOrder`.

Response example:

```json
[
  {
    "_id": "682b4a710000000000000101",
    "projectName": "Personal Blog Rebuild",
    "techStack": ["Vue 3", "Node.js", "Express", "MongoDB"],
    "description": "Refactored a static blog into a dynamic full-stack application.",
    "achievement": "Established separated front-end/back-end architecture and reusable content APIs.",
    "duration": "2026.05 - 至今",
    "sortOrder": 1
  }
]
```

#### `POST /api/experiences`
Requires `Authorization: Bearer <token>`.

Request body:

```json
{
  "projectName": "API Smoke Test",
  "techStack": ["Express", "JWT"],
  "description": "verify protected experience endpoint",
  "achievement": "optional",
  "duration": "optional",
  "sortOrder": 1
}
```

#### `PUT /api/experiences/:id`
Requires `Authorization: Bearer <token>`.
Supports partial updates.

#### `DELETE /api/experiences/:id`
Requires `Authorization: Bearer <token>`.

## 5. Tested Results
The following checks were executed successfully on this machine:
- `GET /api/health`
- `GET /api/posts`
- `POST /api/auth/login`
- `POST /api/posts` with JWT
- `POST /api/experiences` with JWT

Tested server URL:

```text
http://localhost:4000
```

## 6. Current Notes
- The server already matches the required modules in `REQUIREMENTS_AND_API.md`
- Cover image upload endpoint is not implemented yet; posts currently store `coverImage` as a string field
- Front-end pages are still using mock data, so the next step can be wiring `client` to these APIs
