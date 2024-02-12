import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"




const ViewCategory = () => {
    const [categories , setCategories] = useState([])
    useEffect( () => {
      axios.get('http://localhost:3001/category/view')
      .then(res => {
        setCategories(res.data)
        console.log(res.data)
      }).catch(err => console.log(err))
    },[])

  return (
    <main className="main-container table" >
            <Link to='/superadmin/addcategory' className="table-btn">Add +</Link>
        <table>
            <thead>
                <tr>
                    <th>Categories</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                
{
        categories.map(category => {
          return  <tr key={category.id}>
          <td>{category.category}</td>
          <td>
            <Link to={`/superadmin/deletecategory/${category._id}`} className="table-btn delete">Delete</Link>
          </td>
      </tr>
        })
      }
            </tbody>
        </table>
    </main>
  )
}

export default ViewCategory
