import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"




const Home_Interface = ({role}) => {
  return (
    <div>
      < Navbar role = {role} />
      < Outlet />
    </div>
  )
}

export default Home_Interface
