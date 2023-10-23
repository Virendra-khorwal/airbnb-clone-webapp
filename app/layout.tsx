import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from '@components/navbar/Navbar'
import RegisterModal from '@components/modals/RegisterModal'
import ToasterProvider from '@providers/ToasterProvider'
import LoginModal from '@components/modals/LoginModal'
import getCurrentUser from '@actions/getCurrentUser'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb Clone Webapp',
  description: 'Airbnb clone webapp using nextjs and tailwindcss and prisma',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();
  // const currentUser = null

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <LoginModal />  
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
        
        </body>
    </html>
  )
}
