import './globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'WeatherApp - Real-time Weather Information',
  description: 'Get accurate weather forecasts and current conditions for cities worldwide',
  keywords: 'weather, forecast, temperature, climate, meteorology',
  authors: [{ name: 'Your Name' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-geist bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 min-h-screen">
        {children}
      </body>
    </html>
  )
}
