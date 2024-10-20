import { NextFont } from "next/dist/compiled/@next/font"
import Navbar from "./Navbar"
import { Poppins } from "next/font/google"
import Footer from "./Footer"

const poppins: NextFont = Poppins({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"]
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${poppins.className} flex flex-col h-screen w-full justify-between bg-white dark:bg-sky-950 text-sky-950`}>
      <Navbar />
      <main className="w-full mb-auto bg-white dark:bg-sky-950">
        {children}
      </main>
      <Footer />
    </div>
  )
}