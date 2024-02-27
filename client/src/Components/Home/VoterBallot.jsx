import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VoterBallot = () => {
  const [mpas, setMPAs] = useState([]);
  const [mnas, setMNAs] = useState([]);
  const [votedMNA, setVotedMNA] = useState(false);
  const [votedMPA, setVotedMPA] = useState(false);

  useEffect(() => {
    // Fetch CNIC from local storage
    const cnic = JSON.parse(localStorage.getItem("current user"));

    // Make GET request to fetch voter data
    axios
      .get(`http://localhost:3001/voter/votercnic?cnic=${cnic}`)
      .then((res) => {
        const voterConstituency = res.data.constituency;
        const votedMNAStatus = res.data.votedmna;
        const votedMPAStatus = res.data.votedmpa;

        setVotedMNA(votedMNAStatus);
        setVotedMPA(votedMPAStatus);

        // Make GET request to fetch candidates based on constituency for MPA
        axios
          .get(
            `http://localhost:3001/candidate/mpacandidateconstituency?constituency=${voterConstituency}`
          )
          .then((res) => {
            setMPAs(res.data);
          })
          .catch((err) => {
            console.error("Error fetching MPA candidates:", err);
          });

        // Make GET request to fetch candidates based on constituency for MNA
        axios
          .get(
            `http://localhost:3001/candidate/mnacandidateconstituency?constituency=${voterConstituency}`
          )
          .then((res) => {
            setMNAs(res.data);
          })
          .catch((err) => {
            console.error("Error fetching MNA candidates:", err);
          });
      })
      .catch((err) => {
        console.error("Error fetching voter data:", err);
      });
  }, []);

  return (
    <div className="voter-ballot">
      <div className="ballot mpa-ballot">
        {votedMPA != 0 ? (
          <h2>You have already voted for an MPA Candidate</h2>
        ) : (
          <>
            <h2>MPA Candidates</h2>
            <table className="ballot-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Picture</th>
                  <th>Symbol</th>
                  <th>CNIC</th>
                  <th>Votes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mpas.map((mpa) => (
                  <tr key={mpa._id}>
                    <td>{mpa.name}</td>
                    <td>
                      <img
                        src={`http://localhost:3001/Images/` + mpa.symbol}
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
                        src={`http://localhost:3001/Candidates/` + mpa.symbol}
                        alt="symbol"
                        style={{
                          width: "100PX",
                          height: "auto",
                          borderRadius: "10%",
                        }}
                      />
                    </td>
                    <td>{mpa.cnic}</td>
                    <td>{mpa.votes}</td>
                    <td>
                      <Link
                        to={`/votedmpa/${mpa._id}`}
                        className="btn-login edit link"
                      >
                        Vote
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      <div className="ballot mna-ballot">
        {votedMNA != 0 ? (
          <h2>You have already voted for an MNA Candidate</h2>
        ) : (
          <>
            <h2>MNA Candidates</h2>
            <table className="ballot-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Picture</th>
                  <th>Symbol</th>
                  <th>CNIC</th>
                  <th>Votes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mnas.map((mna) => (
                  <tr key={mna._id}>
                    <td>{mna.name}</td>
                    <td>
                      <img
                        src={`http://localhost:3001/Images/` + mna.image}
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
                        src={`http://localhost:3001/Candidates/` + mna.symbol}
                        alt="symbol"
                        style={{
                          width: "100PX",
                          height: "auto",
                          borderRadius: "10%",
                        }}
                      />
                    </td>
                    <td>{mna.cnic}</td>
                    <td>{mna.votes}</td>
                    <td>
                      <Link
                        to={`/votedmna/${mna._id}`}
                        className="btn-login edit link"
                      >
                        Vote
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default VoterBallot;
