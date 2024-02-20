import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ViewParty() {
  const [parties, setParties] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/party/view")
      .then((res) => {
        setParties(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="main-container table">
      <Link to="/superadmin/addparty" className="table-btn">
        Add +
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((party) => {
            return (
              <tr key={party.id}>
                <td>{party.name}</td>
                <td>
                  <Link
                    to={`/superadmin/deleteparty/${party._id}`}
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
}
