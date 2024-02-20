import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewVoter = () => {
  const [users, setUsers] = useState([]);

  const [gender, setGender] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [constituency, setConstituency] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [constituencies, setConstituencies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/voter/supview")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
  }, []);

  const handleProvinceChange = (e) => {
    e.preventDefault();
    const selectedProvince = e.target.value;

    setProvince(selectedProvince);

    if (selectedProvince !== " ") {
      axios
        .get(
          `http://localhost:3001/voter/viewbyprovince?province=${selectedProvince}`
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
          `http://localhost:3001/voter/viewbydistrict?district=${selectedDistrict}`
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
          `http://localhost:3001/voter/viewbyconstituency?constituency=${selectedConstituency}`
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
          `http://localhost:3001/voter/viewbygender?gender=${selectedGender}`
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
      <Link to="/superadmin/addvoter" className="table-btn">
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
            <th>Picture</th>
            <th>Gender</th>
            <th>CNIC</th>
            <th>Province</th>
            <th>District</th>
            <th>Constituency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  <img
                    src={`http://localhost:3001/Images/` + user.image}
                    alt="Voter"
                    style={{
                      width: "100PX",
                      height: "auto",
                      borderRadius: "10%",
                    }}
                  />
                </td>
                <td>{user.gender}</td>
                <td>{user.cnic}</td>
                <td>{user.province}</td>
                <td>{user.district}</td>
                <td>{user.constituency}</td>
                <td>
                  <Link
                    to={`/superadmin/updatevoter/${user._id}`}
                    className="table-btn edit"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/superadmin/deletevoter/${user._id}`}
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

export default ViewVoter;
