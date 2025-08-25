// src/app/layout.tsx

import './globals.css'  // Import our CSS styles
import { Inter } from 'next/font/google'  // Import Google Font

// Load Inter font from Google Fonts
const inter = Inter({ subsets: ['latin'] })

// This tells search engines about our website
export const metadata = {
  title: 'QuickFetch - Next.js Demo',
  description: 'A mini app showcasing Next.js SSR and TypeScript',
}

// This function wraps around EVERY page on our website
export default function RootLayout({
  children,  // This is whatever page the user is viewing
}: {
  children: React.ReactNode  // TypeScript: children can be any React component
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          
          {/* HEADER - appears on every page */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold text-gray-900">
                QuickFetch
              </h1>
              <p className="text-gray-600 mt-1">
                Next.js + TypeScript Mini App Demo
              </p>
            </div>
          </header>
          
          {/* MAIN CONTENT - this changes based on which page user visits */}
          <main>{children}</main>
          
        </div>
      </body>
    </html>
  )
}

/*
EXPLANATION:

1. This is like a template that wraps every page
2. {children} = whatever page content should go
3. If user visits homepage, {children} = homepage content
4. If user visits about page, {children} = about page content
5. Header stays the same, only {children} changes

CSS CLASSES EXPLAINED:
- min-h-screen = minimum height is full screen
- bg-gray-50 = light gray background
- mx-auto = center the content horizontally
- px-4 = padding left and right
- py-6 = padding top and bottom
*/