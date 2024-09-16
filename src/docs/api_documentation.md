# Agentic UI API Documentation

This document provides detailed information about the Agentic UI API, including implementation instructions for Python FastAPI, Express.js, and RESTful endpoints.

## Table of Contents

1. [API Overview](#api-overview)
2. [Endpoints](#endpoints)
3. [Implementation with Python FastAPI](#implementation-with-python-fastapi)
4. [Implementation with Express.js](#implementation-with-express-js)
5. [RESTful Best Practices](#restful-best-practices)

## API Overview

The Agentic UI API provides endpoints for searching, retrieving pro search suggestions, and fetching sources. The API is designed to be flexible and can be implemented using various backend technologies.

## Endpoints

### 1. Search

- **Endpoint**: `/api/search`
- **Method**: POST
- **Description**: Performs a search based on the provided query.
- **Request Body**:
  ```json
  {
    "query": "string",
    "filters": {
      "language": "string",
      "date_range": {
        "start": "string (ISO 8601)",
        "end": "string (ISO 8601)"
      }
    }
  }
  ```
- **Response**:
  ```json
  {
    "answer": "string",
    "pro_search": ["string"],
    "sources": [
      {
        "title": "string",
        "url": "string"
      }
    ]
  }
  ```

### 2. Pro Search Suggestions

- **Endpoint**: `/api/pro-search`
- **Method**: GET
- **Description**: Retrieves pro search suggestions based on the current query.
- **Query Parameters**:
  - `query`: string
- **Response**:
  ```json
  {
    "suggestions": ["string"]
  }
  ```

### 3. Sources

- **Endpoint**: `/api/sources`
- **Method**: GET
- **Description**: Fetches sources for a given search result.
- **Query Parameters**:
  - `search_id`: string
- **Response**:
  ```json
  {
    "sources": [
      {
        "title": "string",
        "url": "string",
        "snippet": "string"
      }
    ]
  }
  ```

## Implementation with Python FastAPI

Here's a complete implementation of these endpoints using Python FastAPI:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI()

class DateRange(BaseModel):
    start: datetime
    end: datetime

class SearchFilters(BaseModel):
    language: Optional[str] = None
    date_range: Optional[DateRange] = None

class SearchRequest(BaseModel):
    query: str
    filters: Optional[SearchFilters] = None

class Source(BaseModel):
    title: str
    url: str

class SearchResponse(BaseModel):
    answer: str
    pro_search: List[str]
    sources: List[Source]

@app.post("/api/search", response_model=SearchResponse)
async def search(request: SearchRequest):
    # Implement your search logic here
    # This is a placeholder response
    return SearchResponse(
        answer="This is a sample answer for the query: " + request.query,
        pro_search=["Advanced search for " + request.query, "Explore related topics"],
        sources=[
            Source(title="Source 1", url="http://example.com/1"),
            Source(title="Source 2", url="http://example.com/2")
        ]
    )

@app.get("/api/pro-search")
async def pro_search(query: str):
    # Implement your pro search suggestion logic here
    suggestions = [
        f"Advanced analysis of {query}",
        f"Compare {query} with similar topics",
        f"Historical perspective on {query}"
    ]
    return {"suggestions": suggestions}

@app.get("/api/sources")
async def get_sources(search_id: str):
    # Implement your source fetching logic here
    sources = [
        {
            "title": f"Comprehensive Guide to {search_id}",
            "url": f"http://example.com/guide/{search_id}",
            "snippet": f"This guide provides an in-depth look at {search_id}..."
        },
        {
            "title": f"Latest Research on {search_id}",
            "url": f"http://example.com/research/{search_id}",
            "snippet": f"Recent studies have shown that {search_id} has significant impact on..."
        }
    ]
    return {"sources": sources}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## Implementation with Express.js

Here's a complete implementation of these endpoints using Express.js:

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/api/search', (req, res) => {
  const { query, filters } = req.body;
  // Implement your search logic here
  const searchResponse = {
    answer: `This is a sample answer for the query: ${query}`,
    pro_search: [`Advanced search for ${query}`, "Explore related topics"],
    sources: [
      { title: "Source 1", url: "http://example.com/1" },
      { title: "Source 2", url: "http://example.com/2" }
    ]
  };
  res.json(searchResponse);
});

app.get('/api/pro-search', (req, res) => {
  const { query } = req.query;
  // Implement your pro search suggestion logic here
  const suggestions = [
    `Advanced analysis of ${query}`,
    `Compare ${query} with similar topics`,
    `Historical perspective on ${query}`
  ];
  res.json({ suggestions });
});

app.get('/api/sources', (req, res) => {
  const { search_id } = req.query;
  // Implement your source fetching logic here
  const sources = [
    {
      title: `Comprehensive Guide to ${search_id}`,
      url: `http://example.com/guide/${search_id}`,
      snippet: `This guide provides an in-depth look at ${search_id}...`
    },
    {
      title: `Latest Research on ${search_id}`,
      url: `http://example.com/research/${search_id}`,
      snippet: `Recent studies have shown that ${search_id} has significant impact on...`
    }
  ];
  res.json({ sources });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## RESTful Best Practices

When implementing these endpoints, follow these RESTful best practices:

1. **Use HTTP methods appropriately**: 
   - GET for retrieving data
   - POST for creating new resources or complex queries
   - PUT for updating existing resources
   - DELETE for removing resources

2. **Use meaningful HTTP status codes**:
   - 200 for successful requests
   - 201 for successful resource creation
   - 400 for bad requests
   - 404 for not found resources
   - 500 for server errors

3. **Version your API**: Include the version in the URL (e.g., `/v1/api/search`) or use an `Accept` header.

4. **Use plural nouns for resource names**: e.g., `/api/sources` instead of `/api/source`.

5. **Handle errors gracefully**: Provide meaningful error messages and appropriate status codes.

6. **Implement pagination**: For endpoints that may return large amounts of data.

7. **Use HTTPS**: Always use HTTPS to ensure secure communication.

8. **Implement rate limiting**: To prevent abuse and ensure fair usage of your API.

9. **Provide clear documentation**: Keep your API documentation up-to-date and easily accessible.

10. **Use consistent naming conventions**: Use snake_case for query parameters and camelCase for JSON properties.

By following these practices and implementing the endpoints as described, you'll have a robust and RESTful API for the Agentic UI.
