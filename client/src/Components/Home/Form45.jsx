import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Form45() {
  const { id } = useParams();

  const [mpaCandidates, setMpaCandidates] = useState([]);
  const [mnaCandidates, setMnaCandidates] = useState([]);
  const [totalVoters, setTotalVoters] = useState();
  const [maleVoters, setMaleVoters] = useState();
  const [femaleVoters, setFemaleVoters] = useState();
  const [constituency, setConstituency] = useState();
  const [votedMna, setVotedMna] = useState();
  const [malevotedMna, setmaleVotedMna] = useState();
  const [femalevotedMna, setfemaleVotedMna] = useState();
  const [votedMpa, setVotedMpa] = useState();
  const [malevotedMpa, setmaleVotedMpa] = useState();
  const [femalevotedMpa, setfemaleVotedMpa] = useState();

  useEffect(() => {
    axios.get("http://localhost:3001/constituency/form45/" + id).then((res) => {
      setMpaCandidates(res.data.mpacandidates);
      setMnaCandidates(res.data.mnacandidates);
      setConstituency(res.data.currentconstituency);
      setMaleVoters(res.data.malevoters);
      setFemaleVoters(res.data.femalevoters);
      setTotalVoters(res.data.totalvoters);
      setVotedMpa(res.data.votedmpa);
      setVotedMna(res.data.votedmna);
      setmaleVotedMpa(res.data.malevotedmpa);
      setmaleVotedMna(res.data.malevotedmna);
      setfemaleVotedMpa(res.data.femalevotedmpa);
      setfemaleVotedMna(res.data.femalevotedmna);
    });
  }, [id]);

  return (
    <div style={{ width: "200%", marginLeft: "10%", justifyContent: "center" }}>
      <div
        style={{ width: "200%", justifyContent: "center" }}
        className="upperpart"
      >
        <label
          style={{ fontWeight: "bolder", fontSize: "1.5rem" }}
          htmlFor="name"
        >
          Name of Constituency =
          <span style={{ textDecoration: "underline" }}>{constituency}</span>
          <br />
        </label>
        <label
          style={{ fontWeight: "bolder", fontSize: "1.5rem" }}
          htmlFor="name"
        >
          Votes Assigned to Constituency = male : <span>{maleVoters}</span>{" "}
          female : <span>{femaleVoters}</span> Total :<span>{totalVoters}</span>
        </label>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "10px" }}>
          <table style={{ marginTop: "10px" }}>
            <thead>
              <tr>
                <th colSpan={3}> Form For MPA Candidates </th>
              </tr>
              <tr>
                <th>Sr.No</th>
                <th>Name of Candidates</th>
                <th>Votes Polled in Favour of each Candidate</th>
              </tr>
            </thead>
            <tbody>
              {mpaCandidates.length > 0 ? (
                mpaCandidates.map((mpa, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{mpa.name}</td>
                    <td>{mpa.votes}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No MPA candidates found</td>
                </tr>
              )}

              <tr>
                <td colSpan={2}>Total</td>
                <td>{votedMpa}</td>
              </tr>
              <tr>
                <td rowSpan={2}>No. of votes polled</td>
                <td>male</td>
                <td>{malevotedMpa}</td>
              </tr>
              <tr>
                <td>female</td>
                <td>{femalevotedMpa}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <table style={{ marginTop: "10px", marginRight: "10px" }}>
            <thead>
              <tr>
                <th colSpan={3}> Form For MNA Candidates </th>
              </tr>
              <tr>
                <th>Sr.No</th>
                <th>Name of Candidates</th>
                <th>Votes Polled in Favour of each Candidate</th>
              </tr>
            </thead>
            <tbody>
              {mnaCandidates.length > 0 ? (
                mnaCandidates.map((mna, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{mna.name}</td>
                    <td>{mna.votes}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No MPA candidates found</td>
                </tr>
              )}

              <tr>
                <td colSpan={2}>Total</td>
                <td>{votedMna}</td>
              </tr>
              <tr>
                <td rowSpan={2}>No. of votes polled</td>
                <td>male</td>
                <td>{malevotedMna}</td>
              </tr>
              <tr>
                <td>female</td>
                <td>{femalevotedMna}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
