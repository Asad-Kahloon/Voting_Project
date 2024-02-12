import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSubCandidate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  axios.defaults.withCredentials = true;

  const [categories, setCategories] = useState([]);
  const [constituencies, setConstituencies] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [cnic, setCnic] = useState("");
  const [symbol, setSymbol] = useState("");
  const [category, setCategory] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/category/view")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/candidate/candidate/${id}`)
      .then((res) => {
        if (res.data) {
          setName(res.data.name || "");
          setGender(res.data.gender || "");
          setCnic(res.data.cnic || "");
          setSymbol(res.data.symbol || "");
          setDistrict(res.data.district || "");
          setProvince(res.data.province || "");
          setCategory(res.data.category || "");
          setSelectedConstituency(res.data.constituency || "");
        } else {
          console.log("Candidate data is null or undefined.");
        }
      })
      .catch((err) => console.log("Error fetching Candidate:", err));
  }, [id]);

  useEffect(() => {
    const subcnic = JSON.parse(localStorage.getItem("current user"));

    axios
      .get(`http://localhost:3001/subadmin/viewby?cnic=${subcnic}`)
      .then((res) => {
        const districtname = res.data.district;
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
    setSelectedConstituency(selectedConstituencyValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/candidate/candidate/${id}`, {
        name,
        gender,
        cnic,
        symbol,
        category,
        constituency: selectedConstituency,
        province,
        district,
      })
      .then((res) => {
        if (res.data.updated) {
          navigate("/subadmin/viewcandidate");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="main-container">
      <div className="login-page">
        <div className="login-container">
          <h2>Update Candidate</h2>
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="passymbol">Symbol</label>
              <input
                value={symbol}
                type="text"
                placeholder="symbol"
                onChange={(e) => setSymbol(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                value={category}
                name="category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((Category) => {
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
              <input readOnly name="district" id="district" value={district} />
            </div>
            <div className="form-group">
              <label htmlFor="constituency">Constituency</label>
              <select
                value={selectedConstituency}
                name="constituency"
                id="constituency"
                onChange={handleConstituencyChange}
              >
                <option value="">Select Constituency</option>
                {Array.isArray(constituencies) &&
                  constituencies.map((constituency) => (
                    <option
                      key={constituency.id}
                      value={constituency.constituencyname}
                    >
                      {constituency.constituencyname}
                    </option>
                  ))}
              </select>
            </div>
            <button type="submit" className="btn-login">
              Update
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UpdateSubCandidate;
