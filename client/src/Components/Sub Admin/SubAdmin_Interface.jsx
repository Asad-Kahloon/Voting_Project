import { useState } from "react"
import {Outlet} from 'react-router-dom'

import Header from "../Admin/Header"
import SubSidebar from "./SubSidebar"

const SubAdmin_Interface = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  
    return (
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <SubSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Outlet />
      </div>
    )
  }

export default SubAdmin_Interface
