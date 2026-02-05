# Product Search & Ranking System

A full-stack product search engine built with **Node.js, Express, MongoDB**, and an **optional Hugging Face LLM** for query normalization.  
The system is designed to be **production-safe**, meaning the core search and ranking work even if the LLM is unavailable.

---

## 🚀 Features

- Product storage using MongoDB
- Search with spelling mistakes (e.g. *ifone → iphone*)
- Intent-based search (e.g. **“sasta / cheap”**)
- Deterministic product ranking
- Optional LLM-based query normalization
- RESTful APIs
- Minimal React frontend for testing

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Hugging Face Inference API (optional)

### Frontend
- React

---


# API Testing Guide – Product Search System

Base URL:
http://localhost:3000

---

## 1. Health Check API

Purpose: Verify backend server is running.

Endpoint:
GET /health

Example:
http://localhost:3000/health

Response:
OK

---

## 2. Create Product API

Purpose: Add a new product to MongoDB.

Endpoint:
POST /api/v1/product

Headers:
Content-Type: application/json

Request Body:
{
  "title": "iPhone 16",
  "description": "iPhone 16 128GB black color",
  "rating": 4.5,
  "stock": 10,
  "price": 59000,
  "mrp": 77999,
  "currency": "Rupee",
  "metadata": {
    "color": "black",
    "storage": "128GB"
  }
}

Success Response:
{
  "productId": "65fxxxxxx"
}

---

## 3. Update Product Metadata API

Purpose: Update dynamic product attributes like color, RAM, storage.

Endpoint:
PUT /api/v1/product/meta-data

Headers:
Content-Type: application/json

Request Body:
{
  "productId": "65fxxxxxx",
  "metadata": {
    "color": "black",
    "ram": "8GB",
    "storage": "128GB"
  }
}

Error Response (If product not found):
{
  "message": "Product not found"
}

---

## 4. Search Product API

Purpose: Search and rank products with spelling correction and intent handling.

Endpoint:
GET /api/v1/search/product

Query Parameter:
query=<search_text>

---

### 4.1 Basic Search

Request:
GET /api/v1/search/product?query=iphone

Expected Result:
All iPhone-related products returned.

---

### 4.2 Spelling Mistake Test

Request:
GET /api/v1/search/product?query=ifone 16

Expected Result:
iPhone 16 appears in results.

---

### 4.3 Cheap Intent Test (Sasta)

Request:
GET /api/v1/search/product?query=sasta iphone

Expected Result:
Cheaper products ranked higher.

---

### 4.4 Price Intent Test

Request:
GET /api/v1/search/product?query=iphone 50k

Expected Result:
Products priced under or equal to 50,000.

---

### 4.5 Attribute Filter Test (Color)

Request:
GET /api/v1/search/product?query=iphone black

Expected Result:
Only black-colored iPhone products.

---

## Search API Response Format

{
  "data": [
    {
      "_id": "65fxxxx",
      "title": "iPhone 13",
      "price": 35000,
      "rating": 4.2,
      "metadata": {
        "color": "white"
      },
      "score": 0.82
    }
  ]
}

---

## API Testing Checklist

- Health API working
- Product creation successful
- Metadata update successful
- Search API returning results
- Spelling mistakes handled
- Cheap intent handled
- Price intent handled
- Attribute filtering handled



---

## ⚙️ Environment Variables

Create a `.env` file inside `product-search-backend/`:

```env
PORT=3000
MONGO_URI=your MongoDB URL
HF_API_KEY=your_huggingface_api_key


