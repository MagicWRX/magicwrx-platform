import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth Tool',
  description: 'Standalone Authentication Tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#f8fafc',
        minHeight: '100vh'
      }}>
        {children}
      </body>
    </html>
  )
}
