import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"




const ViewProvince = () => {
    const [provincenames , setProvinceNames] = useState([])
    useEffect( () => {
      axios.get('http://localhost:3001/province/view')
      .then(res => {
        setProvinceNames(res.data)
        console.log(res.data)
      }).catch(err => console.log(err))
    },[])

  return (
    <main className="main-container table" >
            <Link to='/superadmin/addprovince' className="table-btn">Add +</Link>
        <table>
            <thead>
                <tr>
                    <th>Province</th>
                    <th>Election Title</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                
{
        provincenames.map(province => {
          return  <tr key={province.id}>
          <td>{province.provincename}</td>
          <td>{province.electionname}</td>
          <td>
            <Link to={`/superadmin/updateprovince/${province._id}`} className="table-btn edit">Edit</Link>
            <Link to={`/superadmin/deleteprovince/${province._id}`} className="table-btn delete">Delete</Link>
          </td>
      </tr>
        })
      }
            </tbody>
        </table>
    </main>
  )
}

export default ViewProvince
