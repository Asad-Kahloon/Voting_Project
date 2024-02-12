import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewSubConstituency = () => {
  const [constituencies, setConstituencies] = useState([]);
  const [districtname, setDistrictName] = useState("");
  districtname;

  useEffect(() => {
    const cnic = JSON.parse(localStorage.getItem("current user"));

    axios
      .get(`http://localhost:3001/subadmin/viewby?cnic=${cnic}`)
      .then((res) => {
        const district = res.data.district;
        setDistrictName(district);

        axios
          .get(`http://localhost:3001/constituency/viewby?district=${district}`)
          .then((res) => {
            setConstituencies(res.data);
          })
          .catch((err) => console.log("Error fetching constituencies:", err));
      })
      .catch((err) => console.log("Error fetching subadmin:", err));
  }, []);

  return (
    <main className="main-container table">
      <Link to="/subadmin/addconstituency" className="table-btn">
        Add +
      </Link>
      <table>
        <thead>
          <tr>
            <th>Constituency</th>
            <th>District</th>
            <th>Province</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {constituencies.map((constituency) => {
            return (
              <tr key={constituency.id}>
                <td>{constituency.constituencyname}</td>
                <td>{constituency.districtname}</td>
                <td>{constituency.provincename}</td>
                <td>
                  <Link
                    to={`/subadmin/updateconstituency/${constituency._id}`}
                    className="table-btn edit"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/subadmin/deleteconstituency/${constituency._id}`}
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

export default ViewSubConstituency;
