import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddConstituency = () => {
  const navigate = useNavigate();

  const [districtname, setDistrictName] = useState("");
  const [provincename, setProvinceName] = useState("");
  const [constituencyname, setConstituencyName] = useState("");

  useEffect(() => {
    const cnic = JSON.parse(localStorage.getItem("current user"));

    axios
      .get(`http://localhost:3001/subadmin/viewby?cnic=${cnic}`)
      .then((res) => {
        const district = res.data.district;
        const province = res.data.province;
        setDistrictName(district);
        setProvinceName(province);
      })
      .catch((err) => console.log("Error fetching subadmin:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/constituency/subadd", {
        constituencyname,
        provincename,
        districtname,
      })
      .then((res) => {
        if (res.data.constituency_added) {
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
          <h2>Add Constituency</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Constituency Name"
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
            Add
          </button>
        </div>
      </div>
    </main>
  );
};

export default AddConstituency;
