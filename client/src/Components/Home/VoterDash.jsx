import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VoterDash = () => {
  const [username, setUserName] = useState("");
  const [userconstituency, setUserConstituency] = useState("");
  const [femalevoter, setFemaleVoter] = useState("");
  const [malevoter, setMaleVoter] = useState("");
  const [allvoter, setAllVoter] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");
  const [mpa, setMpa] = useState("");
  const [mna, setMna] = useState("");

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
        setUserConstituency(voterConstituency);

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

  useEffect(() => {
    const cnic = JSON.parse(localStorage.getItem("current user"));
    console.log(cnic);
    axios
      .get(`http://localhost:3001/voter/totalvoter?cnic=${cnic}`)
      .then((res) => {
        setAllVoter(res.data.allvoter);
        setMaleVoter(res.data.malevoter);
        setFemaleVoter(res.data.femalevoter);
        setMna(res.data.mna);
        setMpa(res.data.mpa);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="voter">
      <div>{error ? <h1>Error: {error}</h1> : <h1>Welcome {username}</h1>}</div>
      <div
        style={{
          fontWeight: "600",
          fontSize: "30px",
        }}
      >
        Constituency : {userconstituency}
      </div>
      <div
        style={{
          marginTop: "2vh",
          display: "flex",
          width: "100%",
          color: "#fff",
          justifyContent: "space-evenly",
        }}
      >
        <span
          style={{
            backgroundColor: "#4caf50",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          Total Voters : <b>{allvoter}</b>
        </span>
        <span
          style={{
            backgroundColor: "#4caf50",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          Female Voters : <b>{femalevoter}</b>
        </span>
        <span
          style={{
            backgroundColor: "#4caf50",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          Male Voters : <b>{malevoter}</b>
        </span>
        <span
          style={{
            backgroundColor: "#4caf50",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          MPA Candidates : <b>{mpa}</b>
        </span>
        <span
          style={{
            backgroundColor: "#4caf50",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          MNA Candidates : <b>{mna}</b>
        </span>
      </div>
      <div
        className="voter-table"
        style={{
          marginTop: "3vh",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Image</th>
              <th>Symbol</th>
              <th>Category</th>
              <th>CNIC</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td>{candidate.name}</td>
                <td>
                  <img
                    src={`http://localhost:3001/Images/` + candidate.image}
                    alt="symbol"
                    style={{
                      width: "100PX",
                      height: "auto",
                      borderRadius: "10%",
                    }}
                  />
                </td>
                <td>
                  <img
                    src={`http://localhost:3001/Candidates/` + candidate.symbol}
                    alt="symbol"
                    style={{
                      width: "100PX",
                      height: "auto",
                      borderRadius: "10%",
                    }}
                  />
                </td>
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
