# 🔗 Simple URL Shortener

A lightweight and efficient URL Shortener built with Node.js, Express.js, and MongoDB. It lets you convert long URLs into short shareable links and automatically redirects visitors to the original destination.

---

## 🚀 Features

- Shortens any valid URL into a unique short code
- Redirects to the original URL when short link is visited
- Persistent storage with MongoDB (Mongoose)
- Idempotent creation (same longUrl returns existing short link)
- Basic click counter
- CORS-enabled API
- Optional simple web UI served from /public

---

## 🛠️ Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose ORM
- Frontend: Static HTML/CSS/JS (optional)
- Env: dotenv

---

## 📂 Project Structure

```
simple-url-shortener/
├── server.js
├── package.json
├── .env.example
├── /config
│   └── db.js
├── /models
│   └── Url.js
├── /routes
│   └── urlRoutes.js
└── /public
    └── index.html
```

---

## ⚙️ Setup

1. Copy env and edit values
   ```
   cp .env.example .env  # On Windows: copy .env.example .env
   ```
   Required:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/url_shortener
   BASE_URL=http://localhost:5000
   CODE_LENGTH=6
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Run the server
   - Development (auto-restart):
     ```
     npm run dev
     ```
   - Production:
     ```
     npm start
     ```

4. Open the app
   - UI: http://localhost:5000
   - Health check: http://localhost:5000/health

---

## 🧠 API Endpoints

- POST /api/shorten
  - Body:
    ```json
    { "longUrl": "https://example.com/very/long/url" }
    ```
  - Response:
    ```json
    {
      "shortUrl": "http://localhost:5000/abc123",
      "originalUrl": "https://example.com/very/long/url",
      "code": "abc123"
    }
    ```

- GET /:code
  - Redirects to the original URL. Returns 404 JSON if code not found.

- GET /health
  - Returns `{ "status": "ok" }`

cURL example:
```
curl -X POST http://localhost:5000/api/shorten ^
  -H "Content-Type: application/json" ^
  -d "{\"longUrl\":\"https://www.example.com/some/long/url\"}"
```

---

## 🖥️ Frontend

A minimal page is served from /public/index.html. It calls the API and shows the generated short link with a “Copy” button.

---

## 🔎 Notes

- BASE_URL is used to build absolute short URLs (e.g., when behind proxies or in production). If omitted, it is inferred from the incoming request.
- The code length can be customized via CODE_LENGTH.

---

## 📜 License

MIT

---

## 💡 Future Ideas

- Per-link analytics (unique clicks, referrers)
- Auth and per-user link management
- Custom alias support and QR generation
- Deployment guides (Render, Railway, Docker)
