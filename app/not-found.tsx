import React from 'react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center glass rounded-3xl p-8 max-w-md mx-4">
        <div className="text-6xl mb-4">🌨️</div>
        <h2 className="text-3xl font-bold mb-4">404</h2>
        <p className="text-white/70 mb-6">The page you're looking for doesn't exist.</p>
        <a 
          href="/"
          className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
