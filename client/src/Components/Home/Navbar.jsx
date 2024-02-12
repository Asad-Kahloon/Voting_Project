import { Link } from "react-router-dom";

const Navbar = ({ role }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          EVS
        </Link>
      </div>
      <div className="navbar-right">
        {role === "" ? (
          <Link to="/login" className="btn-login link ">
            Login
          </Link>
        ) : (
          <>
            <Link to="/logout" className="btn-login link delete">
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
