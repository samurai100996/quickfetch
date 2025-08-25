// src/app/components/SearchFilter.tsx

'use client' // This tells Next.js: "Run this code in the BROWSER, not server"

import { useState, useMemo } from 'react'  // React hooks for state and performance
import { Post } from '../../types'         // Our Post interface
import PostCard from './PostCard'          // The component we just made

// What this component expects as input
interface SearchFilterProps {
  posts: Post[]  // Array of all posts
}

export default function SearchFilter({ posts }: SearchFilterProps) {
  
  // STATE: What the user has typed in search box
  const [searchTerm, setSearchTerm] = useState('')  // Starts empty: ""
  
  // FILTERED POSTS: Only show posts that match search
  const filteredPosts = useMemo(() => {
    // If user hasn't typed anything, show all posts
    if (!searchTerm.trim()) return posts
    
    // Otherwise, filter posts that contain the search term
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [posts, searchTerm])  // Recalculate when posts or searchTerm changes

  return (
    <div>
      
      {/* SEARCH INPUT BOX */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={searchTerm}                          // Current search text
          onChange={(e) => setSearchTerm(e.target.value)}  // Update when user types
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        
        {/* Show search results count */}
        {searchTerm && (
          <p className="text-sm text-gray-600 mt-2">
            Found {filteredPosts.length} post(s) matching "{searchTerm}"
          </p>
        )}
      </div>

      {/* POSTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* NO RESULTS MESSAGE */}
      {searchTerm && filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts found matching your search.</p>
        </div>
      )}
      
    </div>
  )
}

/*
HOW THIS WORKS STEP-BY-STEP:

1. Component receives all posts as props
2. User types "cook" in search box
3. setSearchTerm("cook") updates the state
4. useMemo recalculates filteredPosts
5. filteredPosts = only posts containing "cook" in title or body
6. Component re-renders showing only matching posts

EXAMPLE FLOW:
- All posts: ["How to Cook", "Travel Tips", "Cooking Basics"]
- User types: "cook"
- filteredPosts: ["How to Cook", "Cooking Basics"] 
- Only these 2 posts are displayed

REACT HOOKS EXPLAINED:
- useState: Stores data that can change (like search text)
- useMemo: Only recalculates when dependencies change (performance optimization)

WHY 'use client'?
- Search needs to respond instantly to user typing
- This requires JavaScript running in the browser
- Without 'use client', this would try to run on server (no user interaction)
*/