import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSubCandidate = () => {
  const navigate = useNavigate();

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
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
      .post("http://localhost:3001/candidate/subadd", {
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
        if (res.data.candidate_added) {
          navigate("/subadmin/viewcandidate");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="main-container">
      <div className="login-page">
        <div className="login-container">
          <h2>Add Candidate</h2>
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
            <label htmlFor="passymbol">Symbol</label>
            <input
              type="text"
              placeholder="symbol"
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
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
            <input value={province} name="province" readOnly id="province" />
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <input name="district" id="district" value={district} />
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

export default AddSubCandidate;
