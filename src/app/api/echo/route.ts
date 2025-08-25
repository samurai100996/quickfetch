// src/app/api/echo/route.ts

import { NextRequest, NextResponse } from 'next/server'  // Next.js request/response objects
import { EchoResponse } from '../../../types'            // Our response interface

// Handle POST requests to /api/echo
export async function POST(request: NextRequest) {
  try {
    // Parse JSON from request body
    const body = await request.json()
    
    // Create response object
    const response: EchoResponse = {
      message: "Echo API endpoint working!",
      timestamp: new Date().toISOString(),  // Current time
      data: body  // Return whatever was sent to us
    }
    
    // Send JSON response with 200 status (success)
    return NextResponse.json(response, { status: 200 })
    
  } catch (error) {
    // If JSON parsing fails, return error
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }  // 400 = Bad Request
    )
  }
}

// Handle GET requests to /api/echo  
export async function GET() {
  return NextResponse.json({
    message: "Echo API is running! Send a POST request with JSON data.",
    timestamp: new Date().toISOString()
  })
}

/*
HOW THIS API WORKS:

WHAT IS AN API ENDPOINT?
- It's like a door where other apps can knock and ask for something
- Your frontend can send data here
- Other websites can send data here
- Mobile apps can send data here

EXAMPLE USAGE:

1. GET REQUEST:
   Visit: http://localhost:3000/api/echo
   Response: {
     "message": "Echo API is running! Send a POST request with JSON data.",
     "timestamp": "2025-01-15T10:30:00.000Z"
   }

2. POST REQUEST:
   Send to: http://localhost:3000/api/echo
   Body: { "name": "John", "age": 25 }
   Response: {
     "message": "Echo API endpoint working!",
     "timestamp": "2025-01-15T10:30:00.000Z",
     "data": { "name": "John", "age": 25 }
   }

WHY IS THIS USEFUL?
- You can save user data to database
- You can process payments
- You can send emails
- You can integrate with other services
- Your app becomes both frontend AND backend

TESTING THE API:
You can test this with curl:
curl -X POST http://localhost:3000/api/echo \
  -H "Content-Type: application/json" \
  -d '{"test": "hello world"}'

Or use Postman, or even fetch() from browser:
fetch('/api/echo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello from frontend!' })
})
*/