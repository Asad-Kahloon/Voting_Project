import { useState} from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


const AddCategory = () => {


    const navigate = useNavigate();


    const [category, setCategory] = useState();


  
  
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
  
        e.preventDefault();
        axios.post('http://localhost:3001/category/add', {category})
        .then(res => {
            if(res.data.category_created){
                navigate('/superadmin/viewcategory')
            }
            console.log(res)
        })
        .catch(err => console.log(err))
    }



  return (
    <main className="main-container">
      
      <div className="login-page">
      <div className="login-container">
        <h2>Add Category</h2>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" placeholder="Add Candidate Category here" 
          onChange={(e) => setCategory(e.target.value)} />
        </div>
        <button className="btn-login"
        onClick={handleSubmit}>Add</button>
      </div>
    </div>

    </main>
  )
}

export default AddCategory




