import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewCandidate = () => {
  const [users, setUsers] = useState([]);

  const [gender, setGender] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const [constituency, setConstituency] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [constituencies, setConstituencies] = useState([]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/province/view")
      .then((res) => {
        setProvinces(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3001/district/view")
      .then((res) => {
        setDistricts(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3001/constituency/supview")
      .then((res) => {
        setConstituencies(res.data);
      })
      .catch((err) => console.log(err));

    axios.get("http://localhost:3001/candidate/supview").then((res) => {
      setUsers(res.data);
    });

    axios.get("http://localhost:3001/category/view").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleProvinceChange = (e) => {
    e.preventDefault();
    const selectedProvince = e.target.value;

    setProvince(selectedProvince);

    if (selectedProvince !== " ") {
      axios
        .get(
          `http://localhost:3001/candidate/viewbyprovince?province=${selectedProvince}`
        )
        .then((res) => {
          setUsers(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDistrictChange = (e) => {
    e.preventDefault();
    const selectedDistrict = e.target.value;

    setDistrict(selectedDistrict);

    if (selectedDistrict !== " ") {
      axios
        .get(
          `http://localhost:3001/candidate/viewbydistrict?district=${selectedDistrict}`
        )
        .then((res) => {
          setUsers(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleConstituencyChange = (e) => {
    e.preventDefault();
    const selectedConstituency = e.target.value;

    setConstituency(selectedConstituency);

    if (selectedConstituency !== " ") {
      axios
        .get(
          `http://localhost:3001/candidate/viewbyconstituency?constituency=${selectedConstituency}`
        )
        .then((res) => {
          setUsers(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleGenderChange = (e) => {
    e.preventDefault();
    const selectedGender = e.target.value;

    setGender(selectedGender);

    if (selectedGender !== " ") {
      axios
        .get(
          `http://localhost:3001/candidate/viewbygender?gender=${selectedGender}`
        )
        .then((res) => {
          setUsers(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    const selectedCategory = e.target.value;

    setCategory(selectedCategory);

    if (selectedCategory !== " ") {
      axios
        .get(
          `http://localhost:3001/candidate/viewbycategory?category=${selectedCategory}`
        )
        .then((res) => {
          setUsers(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <main className="main-container table">
      <Link to="/superadmin/addcandidate" className="table-btn">
        Add +
      </Link>

      <div className="filter">
        <select
          name="gender"
          value={gender}
          id="gender"
          onChange={handleGenderChange}
        >
          <option value="">Filter by gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          name="category"
          value={category}
          id="gender"
          onChange={handleCategoryChange}
        >
          <option value="">Filter by Category</option>
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            );
          })}
        </select>

        <select
          name="province"
          id="province"
          value={province}
          onChange={handleProvinceChange}
        >
          <option value="">Filter by Province</option>
          {provinces.map((province) => {
            return (
              <option key={province.id} value={province.provincename}>
                {province.provincename}
              </option>
            );
          })}
        </select>
        <select
          name="district"
          id="district"
          value={district}
          onChange={handleDistrictChange}
        >
          <option value="">Filter by District</option>
          {districts.map((district) => (
            <option key={district.id} value={district.districtname}>
              {district.districtname}
            </option>
          ))}
        </select>
        <select
          name="constituency"
          id="constituency"
          value={constituency}
          onChange={handleConstituencyChange}
        >
          <option value="">Filter by Constituency</option>
          {constituencies.map((constituency) => (
            <option key={constituency.id} value={constituency.constituencyname}>
              {constituency.constituencyname}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Gender</th>
            <th>Cnic</th>
            <th>Votes</th>
            <th>Category</th>
            <th>Party</th>
            <th>Province</th>
            <th>District</th>
            <th>Constituency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                <img
                  src={`http://localhost:3001/Candidates/` + user.symbol}
                  alt="Candidate"
                  style={{
                    width: "100PX",
                    height: "auto",
                    borderRadius: "10%",
                  }}
                />
              </td>
              <td>{user.gender}</td>
              <td>{user.cnic}</td>
              <td>{user.votes}</td>
              <td>{user.category}</td>
              <td>{user.party}</td>
              <td>{user.province}</td>
              <td>{user.district}</td>
              <td>{user.constituency}</td>
              <td>
                <Link
                  to={`/superadmin/updatecandidate/` + user._id}
                  className="table-btn edit"
                >
                  Edit
                </Link>
                <Link
                  to={`/superadmin/deletecandidate/${user._id}`}
                  className="table-btn delete"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default ViewCandidate;
