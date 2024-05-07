import { FaLock, FaBlackTie } from "react-icons/fa";
// import { BiSolidCategory } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";

const SubDashboard = () => {
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Candidates</h3>
            <FaBlackTie className="card_icon" />
          </div>
          <h1>3</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Voters</h3>
            <MdPeopleAlt className="card_icon" />
          </div>
          <h1>3</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Votes</h3>
            <FaLock className="card_icon" />
          </div>
          <h1>3</h1>
        </div>
      </div>
    </main>
  );
};

export default SubDashboard;
