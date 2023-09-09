import { Outlet } from "react-router-dom"
import Footer from "../Components/Shared/Footer/Footer"
import Navbar from "../Components/Shared/Navbar/Navbar"

const Main = () => {
  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="pt-28 pb-20">
        <Outlet></Outlet>
      </div>
      <div>
        {/* added it extra might neeed to be corrected */}
        <Footer className="min-h-[calc(100vh-148px)]"></Footer>
      </div>
    </>
  )
}

export default Main
