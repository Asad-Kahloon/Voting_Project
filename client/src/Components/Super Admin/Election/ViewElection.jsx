import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"




const ViewElection = () => {
    const [elections , setElections] = useState([])
    useEffect( () => {
      axios.get('http://localhost:3001/election/view')
      .then(res => {
        setElections(res.data)
        console.log(res.data)
      }).catch(err => console.log(err))
    },[])

  return (
    <main className="main-container table" >
            <Link to='/superadmin/createelection' className="table-btn">Add +</Link>
        <table>
            <thead>
                <tr>
                    <th>Election Title</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                
{
        elections.map(election => {
          return  <tr key={election.id}>
          <td>{election.title}</td>
          <td>{election.date}</td>
          <td>
            <Link to={`/superadmin/updateelection/${election._id}`} className="table-btn edit">Edit</Link>
            <Link to={`/superadmin/deleteelection/${election._id}`} className="table-btn delete">Delete</Link>
          </td>
      </tr>
        })
      }
            </tbody>
        </table>
    </main>
  )
}

export default ViewElection
