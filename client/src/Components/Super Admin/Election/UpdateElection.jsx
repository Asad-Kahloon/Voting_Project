import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"


const UpdateElection = () => {


    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const { id } = useParams();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios
          .get("http://localhost:3001/election/election/" + id)
          .then((res) => {
            setTitle(res.data.title);
            setDate(res.data.date);
          })
          .catch((err) => console.log(err));
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .put("http://localhost:3001/election/election/" + id, { title, date })
          .then((res) => {
            if (res.data.updated) {
              navigate("/superadmin/viewelection");
            } else {
              console.log(res);
            }
          })
          .catch((err) => console.log(err));
      };
  
  



  return (
    <main className="main-container">
      
      <div className="login-page">
      <div className="login-container">
        <h2>Update Election</h2>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input value={title} type="title" placeholder="Election Title"
          onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input value={date} type="date" placeholder="Enter Date" 
          onChange={(e) => setDate(e.target.value)} />
        </div>

        <button className="btn-login"
        onClick={handleSubmit}>Update</button>
      </div>
    </div>

    </main>
  )
}

export default UpdateElection




