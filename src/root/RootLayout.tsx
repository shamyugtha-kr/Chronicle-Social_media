import BottomBar from "@/components/shared/BottomBar"
import LeftBar from "@/components/shared/LeftBar"
import TopBar from "@/components/shared/TopBar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <div className="w-full md:flex lg:flex " >
      <TopBar/>
      <LeftBar/>
      <section className="h-full flex flex-1">
        <Outlet/>
      </section>
      <BottomBar/>
    </div>
  )
}

export default RootLayout