import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewSubCandidate = () => {
  const [Candidates, setCandidates] = useState([]);
  const [district, setDistrict] = useState([]);
  district;

  useEffect(() => {
    const cnic = JSON.parse(localStorage.getItem("current user"));

    axios
      .get(`http://localhost:3001/subadmin/viewby?cnic=${cnic}`)
      .then((res) => {
        const districtname = res.data.district;
        setDistrict(districtname);

        axios
          .get(
            `http://localhost:3001/candidate/subview?districtname=${districtname}`
          )
          .then((res) => {
            setCandidates(res.data);
          })
          .catch((err) => console.log("Error fetching Voters:", err));
      })
      .catch((err) => console.log("Error fetching subadmin:", err));
  }, []);

  return (
    <main className="main-container table">
      <Link to="/subadmin/addcandidate" className="table-btn">
        Add +
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cnic</th>
            <th>Symbol</th>
            <th>Category</th>
            <th>Votes</th>
            <th>Gender</th>
            <th>Province</th>
            <th>District</th>
            <th>Constituency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Candidates.map((Candidate) => {
            return (
              <tr key={Candidate.id}>
                <td>{Candidate.name}</td>
                <td>{Candidate.cnic}</td>
                <td>{Candidate.symbol}</td>
                <td>{Candidate.category}</td>
                <td>{Candidate.votes}</td>
                <td>{Candidate.gender}</td>
                <td>{Candidate.province}</td>
                <td>{Candidate.district}</td>
                <td>{Candidate.constituency}</td>
                <td>
                  <Link
                    to={`/subadmin/updatecandidate/${Candidate._id}`}
                    className="table-btn edit"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/subadmin/deletecandidate/${Candidate._id}`}
                    className="table-btn delete"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default ViewSubCandidate;
