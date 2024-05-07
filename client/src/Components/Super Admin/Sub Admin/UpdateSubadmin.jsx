import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSubadmin = () => {
  const navigate = useNavigate();

  const [Districts, setDistricts] = useState([]);
  const [Provinces, setProvinces] = useState([]);

  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");

  const [gender, setGender] = useState("");

  const { id } = useParams();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/province/view"),
      axios.get("http://localhost:3001/subadmin/subadmin/" + id),
    ])

      .then(([distRes, subRes]) => {
        setProvinces(distRes.data);
        console.log(distRes.data);

        setName(subRes.data.name);
        setGender(subRes.data.gender);
        setCnic(subRes.data.cnic);
        setPassword(subRes.data.password);
        setDistrict(subRes.data.district);
        setProvince(subRes.data.province);
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
    if (!name || !cnic || !password || !district || !province || !gender) {
      alert("Please Fill out all the fields");
    } else {
      axios
        .put("http://localhost:3001/subadmin/subadmin/" + id, {
          name,
          cnic,
          password,
          district,
          province,
          gender,
        })
        .then((res) => {
          if (res.data.updated) {
            navigate("/superadmin/viewsubadmin");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <main className="main-container">
      <div className="login-page">
        <div className="login-container">
          <h2>Update Sub Admin</h2>
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
            <select
              name="province"
              id="province"
              value={province}
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
              value={district}
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
            Update
          </button>
        </div>
      </div>
    </main>
  );
};

export default UpdateSubadmin;
