import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateConstituency = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  axios.defaults.withCredentials = true;

  const [Districts, setDistricts] = useState([]);
  const [Provinces, setProvinces] = useState([]);

  const [districtname, setDistrictName] = useState("");
  const [provincename, setProvinceName] = useState("");
  const [constituencyname, setConstituencyName] = useState("");

  useEffect(() => {
    // Fetch both data in parallel
    Promise.all([
      axios.get("http://localhost:3001/province/view"),
      axios.get("http://localhost:3001/constituency/constituency/" + id),
    ])
      .then(([provinceRes, constituencyRes]) => {
        // Handle response for election data
        setProvinces(provinceRes.data);
        console.log(provinceRes.data);

        // Handle response for province data
        setDistrictName(constituencyRes.data.districtname);
        setProvinceName(constituencyRes.data.provincename);
        setConstituencyName(constituencyRes.data.constituencyname);
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
      alert("please fill out all the fields");
    } else {
      axios
        .put("http://localhost:3001/constituency/supconstituency/" + id, {
          constituencyname,
          provincename,
          districtname,
        })
        .then((res) => {
          if (res.data.updated) {
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
          <h2>Update Constituency</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              value={constituencyname}
              type="text"
              placeholder="Enter Constituency Name"
              onChange={(e) => setConstituencyName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="province">Province</label>
            <select
              value={provincename}
              name="province"
              id="province"
              onChange={handleChange}
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
              value={districtname}
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
            Update
          </button>
        </div>
      </div>
    </main>
  );
};

export default UpdateConstituency;
