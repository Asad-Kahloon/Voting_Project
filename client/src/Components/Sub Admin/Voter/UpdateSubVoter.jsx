import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSubVoter = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  axios.defaults.withCredentials = true;

  const [Constituencies, setConstituencies] = useState([]);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [constituency, setConstituency] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/voter/voter/" + id)
      .then((res) => {
        setName(res.data.name);
        setGender(res.data.gender);
        setCnic(res.data.cnic);
        setPassword(res.data.password);
        setDistrict(res.data.district);
        setProvince(res.data.province);
      })
      .catch((err) => console.log("Error fetching voter:", err));
  }, []);

  useEffect(() => {
    const subcnic = JSON.parse(localStorage.getItem("current user"));
    axios
      .get(`http://localhost:3001/subadmin/viewby?cnic=${subcnic}`)
      .then((res) => {
        const district = res.data.district;
        axios
          .get(`http://localhost:3001/constituency/viewby?district=${district}`)
          .then((res) => {
            setConstituencies(res.data);
          })
          .catch((err) => console.log("Error fetching Voter:", err));
      })
      .catch((err) => console.log("Error fetching subadmin:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/voter/voter/" + id, {
        name,
        cnic,
        gender,
        password,
        constituency,
        province,
        district,
      })
      .then((res) => {
        if (res.data.updated) {
          navigate("/subadmin/viewvoter");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleConstituencyChange = (e) => {
    const selectedConstituencyValue = e.target.value;
    setConstituency(selectedConstituencyValue);
  };

  return (
    <main className="main-container">
      <div className="login-page">
        <div className="login-container">
          <h2>Update Voter</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              value={gender}
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
              value={cnic}
              type="number"
              placeholder="Enter Cnic without dashes"
              onChange={(e) => setCnic(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
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
              value={constituency}
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

export default UpdateSubVoter;
