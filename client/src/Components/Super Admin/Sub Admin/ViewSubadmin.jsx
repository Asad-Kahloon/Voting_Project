import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewSubadmin = () => {
  const [users, setUsers] = useState([]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/subadmin/view")
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="main-container table">
      <Link to="/superadmin/addsubadmin" className="table-btn">
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.gender}</td>
                <td>{user.cnic}</td>
                <td>{user.province}</td>
                <td>{user.district}</td>
                <td>
                  <Link
                    to={`/superadmin/updatesubadmin/${user._id}`}
                    className="table-btn edit"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/superadmin/deletesubadmin/${user._id}`}
                    className="table-btn delete"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
};

export default ViewSubadmin;
