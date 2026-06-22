# 🛍️ Product Browser — CodeVector Internship Task

A full-stack MERN application to browse ~200,000 products with fast cursor-based pagination, category filtering, and stable browsing even when data changes.

---

## 🔗 Live Demo

- **Frontend:** https://product-browser-q2jrru3o7-love-sharma-s-projects.vercel.app
- **Backend API:** https://product-browser-6kqf.onrender.com

---

## 🛠️ Tech Stack

| Layer      | Technology                           |
|------------|--------------------------------------|
| Frontend   | React.js + Vite                      |
| Backend    | Node.js + Express.js                 |
| Database   | MongoDB Atlas                        |
| ODM        | Mongoose                             |
| Hosting    | Render (backend) + Vercel (frontend) |

---

## 📁 Project Structure

```
project/
├── backend/
│   ├── config/
│   │   └── index.js                  # MongoDB connection
│   ├── controllers/
│   │   └── product.controller.js     # Pagination + filter logic
│   ├── models/
│   │   └── product.model.js          # Product schema + indexes
│   ├── routes/
│   │   └── product.routes.js         # API routes
│   ├── app.js                        # Express app + middleware
│   ├── server.js                     # Entry point
│   ├── seed.js                       # Generate 200k products
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── product.api.js        # Axios API calls
│   │   ├── components/
│   │   │   ├── ProductCard.jsx
│   │   │   └── CategoryFilter.jsx
│   │   ├── hooks/
│   │   │   └── useProducts.js        # Pagination logic
│   │   └── App.jsx
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/loveCoder52/product-browser.git
cd product-browser
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_uri
DB_NAME=your_db_name
FRONTEND_URL=http://localhost:5173
```

### 3. Seed the database

```bash
node seed.js
```

Output:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
📦 Inserted 10000 / 200000 products
...
🎉 Seeding complete!
```

### 4. Start backend

```bash
node server.js
```

### 5. Frontend setup

```bash
cd frontend
npm install
```

Create `.env` file in `frontend/`:

```
VITE_API_URL=http://localhost:5000
```

### 6. Start frontend

```bash
npm run dev
```

---

## 🔌 API Reference

### Get Products

```
GET /api/products
```

| Query Param | Type   | Description                          |
|-------------|--------|--------------------------------------|
| limit       | Number | Products per page (default: 20)      |
| cursor      | String | createdAt of last seen product       |
| category    | String | Filter by category (optional)        |

**Example Request:**
```
GET /api/products?limit=20&category=Electronics&cursor=2024-01-15T10:30:00.000Z
```

**Example Response:**
```json
{
  "success": true,
  "count": 20,
  "hasNextPage": true,
  "nextCursor": "2024-01-15T10:30:00.000Z",
  "data": [
    {
      "_id": "...",
      "name": "Sleek Rubber Shoes",
      "category": "Electronics",
      "price": 999,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Create Product

```
POST /api/products
```

**Request Body:**
```json
{
  "name": "Japanese Pant",
  "price": 550,
  "category": "Clothing"
}
```

---

## 🧠 Key Design Decisions

### Why Cursor-Based Pagination?

Normal `skip/limit` pagination breaks when new data is added:

```
// ❌ skip/limit problem
Page 1: skip 0,  limit 20  → products 1-20
// 5 new products added here
Page 2: skip 20, limit 20  → products 6-25 (duplicates!)
```

Cursor-based pagination fixes this:

```
// ✅ cursor pagination
Page 1: fetch 20 newest              → nextCursor = createdAt of last product
Page 2: fetch 20 older than cursor   → always correct, no duplicates
```

### Why MongoDB Indexes?

Without indexes, every query scans all 200k documents. With indexes:

```javascript
productSchema.index({ createdAt: -1 });                  // newest first
productSchema.index({ category: 1, createdAt: -1 });     // category + sort
```

Query time drops from **seconds → milliseconds** ⚡

### Why Batch Insert in seed.js?

```javascript
// ❌ slow — 200,000 DB round trips
for (let i = 0; i < 200000; i++) {
  await Product.create({...})
}

// ✅ fast — 20 round trips only
await Product.insertMany(batch) // 10,000 at a time
```

---

## 🚀 What I'd Improve With More Time

- [ ] Search by product name
- [ ] Sort by price (low to high / high to low)
- [ ] Better UI with Tailwind CSS
- [ ] Loading skeleton instead of spinner
- [ ] Rate limiting on API
- [ ] Unit tests for pagination logic

---

## 🤖 How I Used AI

- **Claude (Anthropic)** helped with boilerplate code, folder structure suggestions, and explaining cursor-based pagination concept
- **What I verified myself:** pagination logic correctness, MongoDB index strategy, why skip/limit fails with live data
- **What AI got wrong:** initially suggested skip/limit pagination — I caught this and switched to cursor-based after understanding the requirement

---

## 📬 Submission

- **GitHub:** https://github.com/loveCoder52/product-browser.git
- **Live URL:** https://product-browser-q2jrru3o7-love-sharma-s-projects.vercel.app
- **Email:** siddharth@codevector.in