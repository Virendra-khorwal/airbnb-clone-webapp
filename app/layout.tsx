import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from '@components/navbar/Navbar'
import RegisterModal from '@components/modals/RegisterModal'
import ToasterProvider from '@providers/ToasterProvider'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb Clone Webapp',
  description: 'Airbnb clone webapp using nextjs and tailwindcss and prisma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}</body>
    </html>
  )
}
