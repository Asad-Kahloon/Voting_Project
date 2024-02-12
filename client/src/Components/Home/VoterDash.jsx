import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VoterDash = () => {
  const [username, setUserName] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch CNIC from local storage
    const cnic = JSON.parse(localStorage.getItem("current user"));

    // Make GET request to fetch voter data
    axios
      .get(`http://localhost:3001/voter/votercnic?cnic=${cnic}`)
      .then((res) => {
        const voterName = res.data.name;
        const voterConstituency = res.data.constituency;

        // Set username from voter data
        setUserName(voterName);

        // Make GET request to fetch candidates based on constituency
        axios
          .get(
            `http://localhost:3001/candidate/candidateconstituency?constituency=${voterConstituency}`
          )
          .then((res) => {
            // Set candidates from the response
            setCandidates(res.data);
          })
          .catch((err) => {
            // Handle errors in fetching candidates
            setError("Error fetching candidates");
            console.error(err);
          });
      })
      .catch((err) => {
        // Handle errors in fetching voter data
        setError("Error fetching voter data");
        console.error(err);
      });
  }, []);

  return (
    <div className="voter">
      <div>{error ? <h1>Error: {error}</h1> : <h1>Welcome {username}</h1>}</div>
      <div className="voter-table">
        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Symbol</th>
              <th>Category</th>
              <th>CNIC</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.symbol}</td>
                <td>{candidate.category}</td>
                <td>{candidate.cnic}</td>
                <td>{candidate.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="vote">
        <h2>
          If we don&apos;t vote we are ignoring history and giving away the
          future
        </h2>
        <Link to="/ballot" className="btn-login link voter-btn">
          Cast Your Vote
        </Link>
      </div>
    </div>
  );
};

export default VoterDash;
