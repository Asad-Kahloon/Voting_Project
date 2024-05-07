import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProvince = () => {
  const navigate = useNavigate();

  const [titles, setTitles] = useState([]);
  const [electionname, setElectionName] = useState("");
  const [provincename, setProvinceName] = useState("");

  const { id } = useParams();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Fetch both data in parallel
    Promise.all([
      axios.get("http://localhost:3001/election/view"),
      axios.get("http://localhost:3001/province/province/" + id),
    ])
      .then(([electionRes, provinceRes]) => {
        // Handle response for election data
        setTitles(electionRes.data);
        console.log(electionRes.data);

        // Handle response for province data
        setElectionName(provinceRes.data.electionname);
        setProvinceName(provinceRes.data.provincename);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!electionname || !provincename) {
      alert("please fill out all fields");
    } else {
      axios
        .put("http://localhost:3001/province/province/" + id, {
          electionname,
          provincename,
        })
        .then((res) => {
          if (res.data.updated) {
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
          <h2>Update Province</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              value={provincename}
              type="text"
              placeholder="Enter Province Name"
              onChange={(e) => setProvinceName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="election">Election</label>
            <select
              value={electionname}
              name="election"
              id="election"
              onChange={(e) => setElectionName(e.target.value)}
            >
              <option value="">Select Election</option>
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
            Update
          </button>
        </div>
      </div>
    </main>
  );
};

export default UpdateProvince;
