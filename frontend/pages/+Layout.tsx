import '../src/index.css'
import { Navbar } from '../src/components/common/Navbar'
import { Footer } from '../src/components/common/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
