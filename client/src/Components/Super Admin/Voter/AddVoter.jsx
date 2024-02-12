import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddVoter = () => {
  const navigate = useNavigate();

  const [Districts, setDistricts] = useState([]);
  const [Provinces, setProvinces] = useState([]);
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
      .get("http://localhost:3001/province/view")
      .then((res) => {
        setProvinces(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleProvinceChange = (e) => {
    const selectedProvinceValue = e.target.value;
    setProvince(selectedProvinceValue);
    if (selectedProvinceValue !== "") {
      axios
        .get(
          `http://localhost:3001/district/viewby?province=${selectedProvinceValue}`
        )
        .then((res) => {
          setDistricts(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictValue = e.target.value;
    setDistrict(selectedDistrictValue);
    if (selectedDistrictValue !== "") {
      axios
        .get(
          `http://localhost:3001/constituency/viewby?district=${selectedDistrictValue}`
        )
        .then((res) => {
          setConstituencies(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleConstituencyChange = (e) => {
    const selectedConstituencyValue = e.target.value;
    setConstituency(selectedConstituencyValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/voter/supadd", {
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
          navigate("/superadmin/viewvoter");
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
            <select
              name="province"
              id="province"
              onChange={handleProvinceChange}
            >
              <option value="">Select Province</option>
              {Provinces.map((province) => {
                return (
                  <option key={province.id} value={province.provincename}>
                    {province.provincename}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <select
              name="district"
              id="district"
              onChange={handleDistrictChange}
            >
              <option value="">Select District</option>
              {Array.isArray(Districts) &&
                Districts.map((district) => {
                  return (
                    <option key={district.id} value={district.districtname}>
                      {district.districtname}
                    </option>
                  );
                })}
            </select>
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

export default AddVoter;