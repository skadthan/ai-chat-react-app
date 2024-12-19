import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authConfig } from '@/auth.config'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authConfig)

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

