// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddCandidate = () => {
//   const navigate = useNavigate();

//   const [Districts, setDistricts] = useState([]);
//   const [Provinces, setProvinces] = useState([]);
//   const [Constituencies, setConstituencies] = useState([]);
//   const [Categories, setCategories] = useState([]);
//   const [Parties, setParties] = useState([]);

//   const [name, setName] = useState("");
//   const [gender, setGender] = useState("");
//   const [cnic, setCnic] = useState("");
//   const [symbol, setSymbol] = useState(null);
//   const [category, setCategory] = useState("");
//   const [province, setProvince] = useState("");
//   const [district, setDistrict] = useState("");
//   const [constituency, setConstituency] = useState("");
//   const [party, setParty] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/province/view")
//       .then((res) => {
//         setProvinces(res.data);
//         console.log(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/category/view")
//       .then((res) => {
//         setCategories(res.data);
//         console.log(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/party/view")
//       .then((res) => {
//         setParties(res.data);
//         console.log(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleProvinceChange = (e) => {
//     const selectedProvinceValue = e.target.value;
//     setProvince(selectedProvinceValue);
//     if (selectedProvinceValue !== "") {
//       axios
//         .get(
//           `http://localhost:3001/district/viewby?province=${selectedProvinceValue}`
//         )
//         .then((res) => {
//           setDistricts(res.data);
//           console.log(res.data);
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   const handleDistrictChange = (e) => {
//     const selectedDistrictValue = e.target.value;
//     setDistrict(selectedDistrictValue);
//     if (selectedDistrictValue !== "") {
//       axios
//         .get(
//           `http://localhost:3001/constituency/viewby?district=${selectedDistrictValue}`
//         )
//         .then((res) => {
//           setConstituencies(res.data);
//           console.log(res.data);
//         })
//         .catch((err) => console.log(err));
//     }
//   };
//   const handleConstituencyChange = (e) => {
//     const selectedConstituencyValue = e.target.value;
//     setConstituency(selectedConstituencyValue);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("gender", gender);
//     formData.append("category", category);
//     formData.append("cnic", cnic);
//     formData.append("constituency", constituency);
//     formData.append("province", province);
//     formData.append("district", district);
//     formData.append("symbol", symbol);
//     formData.append("party", party);

//     axios
//       .post("http://localhost:3001/candidate/supadd", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         if (res.data.candidate_added) {
//           navigate("/superadmin/viewcandidate");
//         }
//         console.log(res);
//       })
//       .catch((err) => console.log(err));
//   };
//   const handleSymbolChange = (e) => {
//     setSymbol(e.target.files[0]);
//   };

//   return (
//     <main className="main-container">
//       <div className="login-page">
//         <div className="login-container">
//           <h2>Add Candidate</h2>
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               placeholder="Enter Name"
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="gender">Gender</label>
//             <select
//               name="gender"
//               id="gender"
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="cnic">Cnic</label>
//             <input
//               type="number"
//               placeholder="Enter Cnic without dashes"
//               onChange={(e) => setCnic(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="symbol">Symbol</label>
//             <input
//               type="file"
//               placeholder="symbol"
//               onChange={handleSymbolChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="category">Category</label>
//             <select
//               name="category"
//               id="category"
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option value="">Select Category</option>
//               {Categories.map((Category) => {
//                 return (
//                   <option key={Category.id} value={Category.category}>
//                     {Category.category}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="party">Party</label>
//             <select
//               name="party"
//               id="party"
//               onChange={(e) => setParty(e.target.value)}
//             >
//               <option value="">Select Party</option>
//               {Parties.map((party) => {
//                 return (
//                   <option key={party.id} value={party.name}>
//                     {party.name}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="province">Province</label>
//             <select
//               name="province"
//               id="province"
//               onChange={handleProvinceChange}
//             >
//               <option value="">Select Province</option>
//               {Provinces.map((province) => {
//                 return (
//                   <option key={province.id} value={province.provincename}>
//                     {province.provincename}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="district">District</label>
//             <select
//               name="district"
//               id="district"
//               onChange={handleDistrictChange}
//             >
//               <option value="">Select District</option>
//               {Array.isArray(Districts) &&
//                 Districts.map((district) => {
//                   return (
//                     <option key={district.id} value={district.districtname}>
//                       {district.districtname}
//                     </option>
//                   );
//                 })}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="constituency">Constituency</label>
//             <select
//               name="constituency"
//               id="constituency"
//               onChange={handleConstituencyChange}
//             >
//               <option value="">Select Constituency</option>
//               {Array.isArray(Constituencies) &&
//                 Constituencies.map((constituency) => {
//                   return (
//                     <option
//                       key={constituency.id}
//                       value={constituency.constituencyname}
//                     >
//                       {constituency.constituencyname}
//                     </option>
//                   );
//                 })}
//             </select>
//           </div>

//           <button className="btn-login" onClick={handleSubmit}>
//             Add
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default AddCandidate;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCandidate = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState(false);

  const [Categories, setCategories] = useState([]);
  const [Parties, setParties] = useState([]);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [cnic, setCnic] = useState("");
  const [symbol, setSymbol] = useState(null);
  const [category, setCategory] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [constituency, setConstituency] = useState("");
  const [party, setParty] = useState("");

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
    axios
      .get("http://localhost:3001/party/view")
      .then((res) => {
        setParties(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSymbolChange = (e) => {
    setSymbol(e.target.files[0]);
  };

  const search = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3001/voter/search?cnic=${cnic}`)
      .then((res) => {
        if (res.data.voter_found) {
          setStatus(true);

          setName(res.data.voter.name);
          setGender(res.data.voter.gender);
          setProvince(res.data.voter.province);
          setDistrict(res.data.voter.district);
          setConstituency(res.data.voter.constituency);
        } else if (!res.data.voter_found) {
          alert("not found in voter list");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("category", category);
    formData.append("cnic", cnic);
    formData.append("constituency", constituency);
    formData.append("province", province);
    formData.append("district", district);
    formData.append("symbol", symbol);
    formData.append("party", party);

    if (!party || !category || !symbol) {
      alert("please fill out all the fields");
    } else {
      axios
        .post("http://localhost:3001/candidate/supadd", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.candidate_added) {
            navigate("/superadmin/viewcandidate");
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
          <h2>Add Candidate</h2>

          {!status ? (
            <>
              <div className="form-group">
                <label htmlFor="cnic">Cnic</label>
                <input
                  type="number"
                  placeholder="Enter Cnic without dashes"
                  onChange={(e) => setCnic(e.target.value)}
                />
              </div>
              <button className="btn-login" onClick={search}>
                Search
              </button>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" value={name} />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input type="text" value={gender} />
              </div>

              <div className="form-group">
                <label htmlFor="symbol">Symbol</label>
                <input
                  type="file"
                  placeholder="symbol"
                  onChange={handleSymbolChange}
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
                <label htmlFor="party">Party</label>
                <select
                  name="party"
                  id="party"
                  onChange={(e) => setParty(e.target.value)}
                >
                  <option value="">Select Party</option>
                  {Parties.map((party) => {
                    return (
                      <option key={party.id} value={party.name}>
                        {party.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="province">Province</label>
                <input type="text" value={province} />
              </div>
              <div className="form-group">
                <label htmlFor="district">District</label>
                <input type="text" value={district} />
              </div>
              <div className="form-group">
                <label htmlFor="constituency">Constituency</label>
                <input type="text" value={constituency} />
              </div>
              <button className="btn-login" onClick={handleSubmit}>
                Add
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default AddCandidate;
