import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSubVoter = () => {
  const navigate = useNavigate();

  const [Constituencies, setConstituencies] = useState([]);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [constituency, setConstituency] = useState("");

  useEffect(() => {
    const subcnic = JSON.parse(localStorage.getItem("current user"));

    axios
      .get(`http://localhost:3001/subadmin/viewby?cnic=${subcnic}`)
      .then((res) => {
        const districtname = res.data.district;
        const provincename = res.data.province;
        setDistrict(districtname);
        setProvince(provincename);

        axios
          .get(
            `http://localhost:3001/constituency/viewby?district=${districtname}`
          )
          .then((res) => {
            setConstituencies(res.data);
          })
          .catch((err) => console.log("Error fetching constituencies:", err));
      })
      .catch((err) => console.log("Error fetching subadmin:", err));
  }, []);

  const handleConstituencyChange = (e) => {
    const selectedConstituencyValue = e.target.value;
    setConstituency(selectedConstituencyValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/voter/subadd", {
        name,
        gender,
        cnic,
        password,
        constituency,
        province,
        district,
      })
      .then((res) => {
        if (res.data.voter_added) {
          navigate("/subadmin/viewvoter");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="main-container">
      <div className="login-page">
        <div className="login-container">
          <h2>Add Voter</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cnic">Cnic</label>
            <input
              type="number"
              placeholder="Enter Cnic without dashes"
              onChange={(e) => setCnic(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="*****"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="province">Province</label>
            <input value={province} name="province" id="province" readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <input value={district} name="district" id="district" readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="constituency">Constituency</label>
            <select
              name="constituency"
              id="constituency"
              onChange={handleConstituencyChange}
            >
              <option value="">Select Constituency</option>
              {Array.isArray(Constituencies) &&
                Constituencies.map((constituency) => {
                  return (
                    <option
                      key={constituency.id}
                      value={constituency.constituencyname}
                    >
                      {constituency.constituencyname}
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

export default AddSubVoter;
