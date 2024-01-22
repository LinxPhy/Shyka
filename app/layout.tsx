import type { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css'
import Header from './_components/header'
import Script from 'next/script';



export const metadata: Metadata = {
  title: 'Shyka | AI Chatbots',
  description: 'AI Chatbots at your service. If you want to interact with your favourite anime/celebrities/superheroes then look no further.',
  keywords: ['AI', 'Chatbot', 'Anime', 'Waifu', 'Chatbots', 'Chat'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20,300,1,200" />
        <link rel="icon" type="image/x-icon" href="/icon.ico" />

        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}>
        </Script>

        <Script id='ga-script' strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
        </Script>

      </head>

      <body>
        <UserProvider>
          <Header />
          {children}
        </UserProvider>

      </body>
    </html>
  )
}
