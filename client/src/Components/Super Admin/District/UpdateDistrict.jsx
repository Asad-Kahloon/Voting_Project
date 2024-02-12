import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"

const UpdateDistrict = () => {


    const navigate = useNavigate();

    const [titles, setTitles] = useState([]);
    const [districtname, setDistrictName] = useState('');
    const [provincename, setProvinceName] = useState('');

    const { id } = useParams();
    axios.defaults.withCredentials = true;


    

    useEffect(() => {
        // Fetch both data in parallel
        Promise.all([
          axios.get('http://localhost:3001/province/view'),
          axios.get('http://localhost:3001/district/district/' + id)
        ])
        .then(([electionRes, provinceRes]) => {
          // Handle response for election data
          setTitles(electionRes.data);
          console.log(electionRes.data);
      
          // Handle response for province data
          setDistrictName(provinceRes.data.districtname);
          setProvinceName(provinceRes.data.provincename);
        })
        .catch(err => console.log(err));
      }, []);
  
  
    const handleSubmit = (e) => {
  
        e.preventDefault();
        axios.put('http://localhost:3001/district/district/' + id, {districtname, provincename})
        .then(res => {
            if(res.data.updated){
                navigate('/superadmin/viewdistrict')
            }
            console.log(res)
        })
        .catch(err => console.log(err))
    }



  return (
    <main className="main-container">
      
      <div className="login-page">
      <div className="login-container">
        <h2>Update District</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input value={districtname} type="text" placeholder="Enter District Name" 
          onChange={(e) => setDistrictName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="election">Province</label>
          <select value={provincename} name="election" id="election" 
          onChange={(e) => setProvinceName(e.target.value)}>
            <option value="">Select Province</option>
            {
                titles.map(title => {
                 return  <option key={title.id} value={title.provincename}>{title.provincename}</option>
                })
            }
          </select>
        </div>

        <button className="btn-login"
        onClick={handleSubmit}>Update</button>
      </div>
    </div>

    </main>
  )
}

export default UpdateDistrict




