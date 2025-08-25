// src/app/page.tsx

import { Post } from '../types'                    // Our Post interface
import PostCard from './components/PostCard'       // Post display component
import SearchFilter from './components/SearchFilter' // Search component

// This function runs on the SERVER before sending HTML to browser
async function getPosts(): Promise<Post[]> {
  try {
    // Fetch posts from JSONPlaceholder (fake blog API)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      // Next.js caching - revalidate every hour (3600 seconds)
      next: { revalidate: 3600 }
    })
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    
    // Convert response to JavaScript objects
    const posts = await response.json()
    
    // Return only first 10 posts for demo (JSONPlaceholder has 100)
    return posts.slice(0, 10)
    
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []  // Return empty array if something goes wrong
  }
}

// This is our homepage component
export default async function HomePage() {
  
  // IMPORTANT: This runs on SERVER before page loads
  const posts = await getPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Latest Posts ({posts.length})
        </h2>
        
        {/* Pass all posts to search component */}
        <SearchFilter posts={posts} />
      </div>
      
      {/* FALLBACK: Show message if no posts loaded */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts available.</p>
        </div>
      ) : null}
      
    </div>
  )
}

/*
SERVER-SIDE RENDERING EXPLAINED:

TRADITIONAL WAY (React/Vite):
1. Browser requests page
2. Server sends empty HTML
3. Browser downloads JavaScript
4. JavaScript runs and fetches data
5. Page finally shows content
(User sees blank page for 2-3 seconds)

NEXT.JS WAY (SSR):
1. Browser requests page  
2. Server runs getPosts() and fetches data
3. Server generates complete HTML with data
4. Browser receives ready-to-display HTML
(User sees content immediately!)

WHAT HAPPENS:
1. User visits http://localhost:3000
2. Next.js server runs getPosts()
3. getPosts() fetches from jsonplaceholder.typicode.com
4. Server gets 100 posts, takes first 10
5. Server generates HTML with all 10 posts
6. Browser gets complete page with data
7. SearchFilter component activates for interactivity

CACHING EXPLAINED:
next: { revalidate: 3600 }
- Cache the data for 1 hour
- If someone visits within 1 hour, use cached data
- After 1 hour, fetch fresh data
- This makes the site faster
*/