import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'signal.fm | High-Signal Podcasts. Zero Noise.',
  description: 'Discover curated Web3 & crypto podcasts based on your level and interest. Skip the noise, find the signal.',
  keywords: ['crypto', 'web3', 'podcasts', 'defi', 'bitcoin', 'ethereum', 'blockchain'],
  authors: [{ name: 'danbuildss', url: 'https://x.com/danbuildss' }],
  openGraph: {
    title: 'signal.fm | High-Signal Podcasts. Zero Noise.',
    description: 'Discover curated Web3 & crypto podcasts based on your level and interest.',
    url: 'https://signal.fm',
    siteName: 'signal.fm',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'signal.fm | High-Signal Podcasts. Zero Noise.',
    description: 'Discover curated Web3 & crypto podcasts based on your level and interest.',
    creator: '@danbuildss',
  },
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
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}