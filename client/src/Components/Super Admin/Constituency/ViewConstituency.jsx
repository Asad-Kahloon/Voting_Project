import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"




const ViewConstituency = () => {

    const [constituencys , setConstituencys] = useState([])

    useEffect( () => {
      axios.get('http://localhost:3001/constituency/supview')
      .then(res => {
        setConstituencys(res.data)
        console.log(res.data)
      }).catch(err => console.log(err))
    },[])

  return (
    <main className="main-container table" >
            <Link to='/superadmin/addconstituency' className="table-btn">Add +</Link>
        <table>
            <thead>
                <tr>
                    <th>Constituency</th>
                    <th>District</th>
                    <th>Province</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                
{
        constituencys.map(constituency => {
          return  <tr key={constituency.id}>
            <td>{constituency.constituencyname}</td>
          <td>{constituency.districtname}</td>
          <td>{constituency.provincename}</td>
          <td>
            <Link to={`/superadmin/updateconstituency/${constituency._id}`} className="table-btn edit">Edit</Link>
            <Link to={`/superadmin/deleteconstituency/${constituency._id}`} className="table-btn delete">Delete</Link>
          </td>
      </tr>
        })
      }
            </tbody>
        </table>
    </main>
  )
}

export default ViewConstituency
