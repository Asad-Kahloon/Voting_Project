import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


const CreateElection = () => {


    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
  
  
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
  
        e.preventDefault();
        axios.post('http://localhost:3001/election/add', {title, date})
        .then(res => {
            if(res.data.election_created){
                navigate('/superadmin/viewelection')
            }
            console.log(res)
        })
        .catch(err => console.log(err))
    }



  return (
    <main className="main-container">
      
      <div className="login-page">
      <div className="login-container">
        <h2>Add Election</h2>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Election Title"
          onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" placeholder="Enter Date" 
          onChange={(e) => setDate(e.target.value)} />
        </div>

        <button className="btn-login"
        onClick={handleSubmit}>Create</button>
      </div>
    </div>

    </main>
  )
}

export default CreateElection




