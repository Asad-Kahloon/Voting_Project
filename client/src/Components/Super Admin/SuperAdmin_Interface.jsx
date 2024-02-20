import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Admin/Header";
import SuperSidebar from "./SuperSidebar";

const SuperAdmin_Interface = ({ role }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header role={role} OpenSidebar={OpenSidebar} />
      <SuperSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Outlet />
    </div>
  );
};

export default SuperAdmin_Interface;
