import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSubConstituency = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  axios.defaults.withCredentials = true;

  const [districtname, setDistrictName] = useState("");
  const [provincename, setProvinceName] = useState("");
  const [constituencyname, setConstituencyName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/constituency/constituency/" + id)
      .then((res) => {
        setDistrictName(res.data.districtname);
        setProvinceName(res.data.provincename);
        setConstituencyName(res.data.constituencyname);
      })
      .catch((err) => console.log("Error fetching constituency:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/constituency/subconstituency/" + id, {
        constituencyname,
        provincename,
        districtname,
      })
      .then((res) => {
        if (res.data.updated) {
          navigate("/subadmin/viewconstituency");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="main-container">
      <div className="login-page">
        <div className="login-container">
          <h2>Update Constituency</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Constituency Name"
              value={constituencyname}
              onChange={(e) => setConstituencyName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="province">Province</label>
            <input type="text" value={provincename} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <input type="text" readOnly value={districtname} />
          </div>
          <button className="btn-login" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    </main>
  );
};

export default UpdateSubConstituency;
