import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

// Professional fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF0F3' },
    { media: '(prefers-color-scheme: dark)', color: '#1A0A0E' },
  ],
}

export const metadata: Metadata = {
  title: {
    default: 'Happy Girlfriend\'s Day ❤️',
    template: '%s | A Gift For You',
  },
  description: 'A magical interactive gift created with love for the most amazing girl. A digital storybook of memories, music, and surprises.',
  keywords: ['girlfriend', 'gift', 'love', 'romantic', 'surprise', 'anniversary', 'girlfriends day'],
  authors: [{ name: 'Your Man ❤️' }],
  creator: 'Your Man ❤️',
  publisher: 'Your Man ❤️',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Happy Girlfriend\'s Day ❤️',
    description: 'A magical interactive gift created with love. Open this digital storybook of memories, music, and surprises.',
    url: 'https://your-domain.vercel.app',
    siteName: 'Girlfriend\'s Day Gift',
    images: [
      {
        url: 'https://your-domain.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Happy Girlfriend\'s Day ❤️',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Girlfriend\'s Day ❤️',
    description: 'A magical interactive gift created with love for the most amazing girl.',
    images: ['https://your-domain.vercel.app/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#FF69B4',
      },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Girlfriend\'s Day ❤️',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'lifestyle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="anonymous" />
        
        {/* PWA Support */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Color Scheme */}
        <meta name="theme-color" content="#FFF0F3" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1A0A0E" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="antialiased bg-rose-50 text-rose-900 font-sans">
        {children}
      </body>
    </html>
  )
}
