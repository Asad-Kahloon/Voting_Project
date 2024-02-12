import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSubadmin = () => {
  const navigate = useNavigate();

  const [Districts, setDistricts] = useState([]);
  const [Provinces, setProvinces] = useState([]);

  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/province/view")
      .then((res) => {
        setProvinces(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  axios.defaults.withCredentials = true;

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
    const selectedConstituencyValue = e.target.value;
    setDistrict(selectedConstituencyValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/subadmin/add", {
        name,
        cnic,
        password,
        district,
        province,
        gender,
      })
      .then((res) => {
        if (res.data.subadmin_added) {
          navigate("/superadmin/viewsubadmin");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="main-container">
      <div className="login-page">
        <div className="login-container">
          <h2>Add Sub Admin</h2>
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
              {Provinces.map((Province) => {
                return (
                  <option key={Province.id} value={Province.provincename}>
                    {Province.provincename}
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

          <button className="btn-login" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </main>
  );
};

export default AddSubadmin;
