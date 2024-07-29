import './globals.css'

export const metadata = {
  title: 'wellwich\'s portfolio',
  description: 'wellwich\'s portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
