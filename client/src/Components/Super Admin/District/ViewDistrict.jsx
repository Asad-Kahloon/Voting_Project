import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"




const ViewDistrict = () => {
    const [districts , setDistricts] = useState([])
    useEffect( () => {
      axios.get('http://localhost:3001/district/view')
      .then(res => {
        setDistricts(res.data)
        console.log(res.data)
      }).catch(err => console.log(err))
    },[])

  return (
    <main className="main-container table" >
            <Link to='/superadmin/adddistrict' className="table-btn">Add +</Link>
        <table>
            <thead>
                <tr>
                    <th>District</th>
                    <th>Province</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                
{
        districts.map(district => {
          return  <tr key={district.id}>
          <td>{district.districtname}</td>
          <td>{district.provincename}</td>
          <td>
            <Link to={`/superadmin/updatedistrict/${district._id}`} className="table-btn edit">Edit</Link>
            <Link to={`/superadmin/deletedistrict/${district._id}`} className="table-btn delete">Delete</Link>
          </td>
      </tr>
        })
      }
            </tbody>
        </table>
    </main>
  )
}

export default ViewDistrict
