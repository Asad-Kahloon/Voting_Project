import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProvince = () => {
  const navigate = useNavigate();

  const [titles, setTitles] = useState([]);
  const [electionname, setElectionName] = useState("");
  const [provincename, setProvinceName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/election/view")
      .then((res) => {
        setTitles(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!electionname || !provincename) {
      alert("please fill out all the fields");
    } else {
      axios
        .post("http://localhost:3001/province/add", {
          electionname,
          provincename,
        })
        .then((res) => {
          if (res.data.province_added) {
            navigate("/superadmin/viewprovince");
          }
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <main className="main-container">
      <div className="login-page">
        <div className="login-container">
          <h2>Add Province</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Province Name"
              onChange={(e) => setProvinceName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="election">Election</label>
            <select
              name="election"
              id="election"
              onChange={(e) => setElectionName(e.target.value)}
            >
              <option value="">Select Election Title</option>
              {titles.map((title) => {
                return (
                  <option key={title.id} value={title.title}>
                    {title.title}
                  </option>
                );
              })}
            </select>
          </div>

          <button className="btn-login" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </main>
  );
};

export default AddProvince;
