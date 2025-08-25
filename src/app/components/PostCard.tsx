// src/app/components/PostCard.tsx

import { Post } from '../../types'  // Import our Post interface

// This defines what props (inputs) this component expects
interface PostCardProps {
  post: Post  // We expect to receive one post object
}

// This component takes a post and displays it nicely
export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      
      {/* TOP ROW: Post number and User info */}
      <div className="flex items-start justify-between mb-3">
        {/* Post number badge */}
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Post #{post.id}
        </span>
        {/* User who wrote this */}
        <span className="text-sm text-gray-500">User {post.userId}</span>
      </div>
      
      {/* TITLE */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3 capitalize">
        {post.title}
      </h3>
      
      {/* CONTENT */}
      <p className="text-gray-700 leading-relaxed">
        {post.body}
      </p>
      
    </div>
  )
}

/*
HOW THIS WORKS:

1. We receive a 'post' object as input
2. post.id = the post number (1, 2, 3...)
3. post.title = the post title
4. post.body = the post content
5. post.userId = who wrote it

EXAMPLE:
If post = { id: 5, title: "How to Cook", body: "Cooking is fun...", userId: 2 }

This component displays:
┌─────────────────────────────┐
│ Post #5           User 2    │
│                             │
│ How To Cook                 │
│                             │
│ Cooking is fun...           │
└─────────────────────────────┘

CSS CLASSES:
- bg-white = white background
- rounded-lg = rounded corners
- shadow-md = medium shadow
- hover:shadow-lg = bigger shadow on mouse hover
- p-6 = padding on all sides
- mb-3 = margin bottom
- flex = arrange items in a row
- justify-between = spread items apart
*/