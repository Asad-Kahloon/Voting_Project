import { FaSheetPlastic } from "react-icons/fa6";
import { FaBlackTie } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { MdPeopleAlt } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";

import { Link } from "react-router-dom";

const SubSidebar = ({ openSidebarToggle, OpenSidebar }) => {
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
        <Link className="link" to="/subadmin">
          <li className="sidebar-list-item">
            <AiFillDashboard className="icon" /> Dashboard
          </li>
        </Link>

        <Link className="link">
          <li className="sidebar-list-item">
            <FaSheetPlastic className="icon" /> Votes
          </li>
        </Link>
        <Link className="link" to="viewvoter">
          <li className="sidebar-list-item">
            <MdPeopleAlt className="icon" /> Voters
          </li>
        </Link>
        <Link className="link" to="viewconstituency">
          <li className="sidebar-list-item">
            <BiSolidCategory className="icon" /> Constituencies
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

export default SubSidebar;
