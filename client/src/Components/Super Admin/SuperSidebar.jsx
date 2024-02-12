import { FaSheetPlastic } from "react-icons/fa6";
import { FaLock, FaBlackTie } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { MdPeopleAlt } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const SuperSidebar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">EVS</div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <Link className="link" to="/superadmin">
          <li className="sidebar-list-item">
            <AiFillDashboard className="icon" /> Dashboard
          </li>
        </Link>
        <Link className="link" to="viewelection">
          <li className="sidebar-list-item">
            <BsFillGearFill className="icon" /> Elections
          </li>
        </Link>
        <Link className="link" to="viewsubadmin">
          <li className="sidebar-list-item">
            <FaLock className="icon" /> Sub Admins
          </li>
        </Link>
        <Link className="link" href="">
          <li className="sidebar-list-item">
            <FaSheetPlastic className="icon" /> Votes
          </li>
        </Link>
        <Link className="link" to="viewvoter">
          <li className="sidebar-list-item">
            <MdPeopleAlt className="icon" /> Voters
          </li>
        </Link>
        <Link to="viewcategory" className="link" href="">
          <li className="sidebar-list-item">
            <BiSolidCategory className="icon" /> Candidates Categories
          </li>
        </Link>
        <Link className="link" to="viewcandidate">
          <li className="sidebar-list-item">
            <FaBlackTie className="icon" /> Candidates
          </li>
        </Link>
      </ul>
    </aside>
  );
};

export default SuperSidebar;
