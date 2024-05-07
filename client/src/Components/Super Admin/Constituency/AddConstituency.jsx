import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddConstituency = () => {
  const navigate = useNavigate();

  const [Districts, setDistricts] = useState([]);
  const [Provinces, setProvinces] = useState([]);

  const [districtname, setDistrictName] = useState("");
  const [provincename, setProvinceName] = useState("");
  const [constituencyname, setConstituencyName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/province/view")
      .then((res) => {
        setProvinces(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const selectedProvinceValue = e.target.value;
    setProvinceName(selectedProvinceValue);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!constituencyname || !provincename || !districtname) {
      alert("please fill out all the field");
    } else {
      axios
        .post("http://localhost:3001/constituency/supadd", {
          constituencyname,
          provincename,
          districtname,
        })
        .then((res) => {
          if (res.data.constituency_added) {
            navigate("/superadmin/viewconstituency");
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
            <select name="province" id="province" onChange={handleChange}>
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
              onChange={(e) => setDistrictName(e.target.value)}
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

export default AddConstituency;
