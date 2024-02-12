import { BsJustify } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = ({ OpenSidebar, role }) => {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        {role === "superadmin" ? <h3>Super Admin</h3> : <h3>Sub Admin</h3>}
      </div>
      <div className="header-right">
        <Link to="/logout" className="btn-login link">
          Logout
        </Link>
      </div>
    </header>
  );
};

export default Header;
