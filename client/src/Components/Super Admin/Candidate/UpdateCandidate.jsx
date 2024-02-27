import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCandidate = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  axios.defaults.withCredentials = true;

  const [Districts, setDistricts] = useState([]);
  const [Provinces, setProvinces] = useState([]);
  const [Constituencies, setConstituencies] = useState([]);
  const [Categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [cnic, setCnic] = useState("");
  const [symbol, setSymbol] = useState("");
  const [category, setCategory] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [constituency, setConstituency] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/category/view")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/province/view"),
      axios.get("http://localhost:3001/category/view"),
      axios.get("http://localhost:3001/candidate/candidate/" + id),
    ])

      .then(([proRes, catRes, canRes]) => {
        setProvinces(proRes.data);

        setCategories(catRes.data);

        setName(canRes.data.name);
        setGender(canRes.data.gender);
        setCnic(canRes.data.cnic);
        setSymbol(canRes.data.symbol);
        setCategory(canRes.data.category);
        setProvince(canRes.data.province);
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
      .put("http://localhost:3001/candidate/candidate/" + id, {
        name,
        gender,
        cnic,
        symbol,
        category,
        constituency,
        province,
        district,
      })
      .then((res) => {
        if (res.data.updated) {
          navigate("/superadmin/viewcandidate");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="main-container">
      <div className="login-page">
        <div className="login-container">
          <h2>Update Candidate</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              value={name}
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
              value={gender}
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
              value={cnic}
              placeholder="Enter Cnic without dashes"
              onChange={(e) => setCnic(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passymbol">Symbol</label>
            <input
              type="text"
              placeholder="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {Categories.map((Category) => {
                return (
                  <option key={Category.id} value={Category.category}>
                    {Category.category}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="province">Province</label>
            <select
              name="province"
              id="province"
              onChange={handleProvinceChange}
              value={province}
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
            Candidate
          </button>
        </div>
      </div>
    </main>
  );
};

export default UpdateCandidate;
