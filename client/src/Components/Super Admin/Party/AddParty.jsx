import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddParty() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("please fill out the field");
    } else {
      axios.post("http://localhost:3001/party/add", { name }).then((res) => {
        if (res.data.party_added) {
          console.log("party added");
          navigate("/superadmin/viewparty");
        }
      });
    }
  };

  return (
    <main className="main-container">
      <div className="login-page">
        <div className="login-container">
          <h2>Add Party</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button className="btn-login" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </main>
  );
}
