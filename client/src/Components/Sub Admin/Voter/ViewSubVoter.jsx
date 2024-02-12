import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddSubVoter = () => {
  const [Voters, setVoters] = useState([]);
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
            `http://localhost:3001/voter/subview?districtname=${districtname}`
          )
          .then((res) => {
            setVoters(res.data);
          })
          .catch((err) => console.log("Error fetching Voters:", err));
      })
      .catch((err) => console.log("Error fetching subadmin:", err));
  }, []);

  return (
    <main className="main-container table">
      <Link to="/subadmin/addvoter" className="table-btn">
        Add +
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Cnic</th>
            <th>Province</th>
            <th>District</th>
            <th>Constituency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Voters.map((Voter) => {
            return (
              <tr key={Voter.id}>
                <td>{Voter.name}</td>
                <td>{Voter.gender}</td>
                <td>{Voter.cnic}</td>
                <td>{Voter.province}</td>
                <td>{Voter.district}</td>
                <td>{Voter.constituency}</td>
                <td>
                  <Link
                    to={`/subadmin/updatevoter/${Voter._id}`}
                    className="table-btn edit"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/subadmin/deletevoter/${Voter._id}`}
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

export default AddSubVoter;
