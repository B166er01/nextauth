import Navbar from '@/components/layout/Navbar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto mt-24">{children}</div>
    </div>
  )
}
