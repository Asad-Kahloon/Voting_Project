import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDistrict = () => {
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState([]);
  const [provincename, setProvinceName] = useState("");
  const [districtname, setDistrictName] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!provincename || !districtname) {
      alert("please fill out all the field");
    } else {
      axios
        .post("http://localhost:3001/district/add", {
          provincename,
          districtname,
        })
        .then((res) => {
          if (res.data.district_added) {
            navigate("/superadmin/viewdistrict");
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
          <h2>Add District</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Province Name"
              onChange={(e) => setDistrictName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="province">Province</label>
            <select
              name="province"
              id="province"
              onChange={(e) => setProvinceName(e.target.value)}
            >
              <option value="">Select Province</option>
              {provinces.map((province) => {
                return (
                  <option key={province.id} value={province.provincename}>
                    {province.provincename}
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

export default AddDistrict;
