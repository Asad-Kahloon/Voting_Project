import { FaLock, FaBlackTie } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import axios from "axios";

const SuperDashboard = () => {
  const [candidate, setCandidate] = useState();
  const [malecandidate, setMaleCandidate] = useState();
  const [femalecandidate, setFemaleCandidate] = useState();

  const [allvoter, setAllVoter] = useState();
  const [malevoter, setMaleVoter] = useState();
  const [femalevoter, setFemaleVoter] = useState();

  const [category, setCategory] = useState();

  const [party, setParty] = useState();
  const [district, setDistrict] = useState();
  const [province, setProvince] = useState();
  const [constituency, setConstituency] = useState();

  const [mna, setMna] = useState();
  const [mpa, setMpa] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/subcount")
      .then((res) => {
        setCandidate(res.data.candidate);
        setMaleCandidate(res.data.malecandidate);
        setFemaleCandidate(res.data.femalecandidate);

        setMna(res.data.mna);
        setMpa(res.data.mpa);

        setCategory(res.data.category);

        setConstituency(res.data.constituency);

        setAllVoter(res.data.allvoter);

        setMaleVoter(res.data.malevoter);

        setFemaleVoter(res.data.femalevoter);

        setParty(res.data.party);
        setDistrict(res.data.district);
        setProvince(res.data.province);

        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const voterData = [
    ["Voters", `Total Voters`],
    ["Men", malevoter],
    ["Women", femalevoter],
  ];

  const voterOptions = {
    title: `Total Voters : ${allvoter}`,
  };

  const candidateData = [
    ["Voters", `Total Candidates : ${candidate}`],
    ["Men", malecandidate],
    ["Women", femalecandidate],
  ];

  const candidateOptions = {
    title: `Total Candidates : ${candidate}`,
  };

  const categoryData = [
    ["Voters", `Candidate Categories : ${category}`],
    ["MPA", mpa],
    ["MNA", mna],
  ];

  const categoryOptions = {
    title: `Candidate Categories : ${category}`,
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <Link to="/superadmin/viewprovince" className="card">
          <div className="card-inner">
            <h3>Provinces</h3>
            <FaBlackTie className="card_icon" />
          </div>
          <h1>{province}</h1>
        </Link>
        <Link to="/superadmin/viewdistrict" className="card">
          <div className="card-inner">
            <h3>Districts</h3>
            <BiSolidCategory className="card_icon" />
          </div>
          <h1>{district}</h1>
        </Link>
        <Link to="/superadmin/viewconstituency" className="card">
          <div className="card-inner">
            <h3>Constituencies</h3>
            <MdPeopleAlt className="card_icon" />
          </div>
          <h1>{constituency}</h1>
        </Link>
        <Link to="/superadmin/viewparty" className="card">
          <div className="card-inner">
            <h3>Parties</h3>
            <FaLock className="card_icon" />
          </div>
          <h1>{party}</h1>
        </Link>
      </div>

      <div className="graphs">
        <Chart
          chartType="PieChart"
          data={voterData}
          options={voterOptions}
          // width={"50%"}
          // height={"400px"}
        />
        <Chart
          chartType="PieChart"
          data={candidateData}
          options={candidateOptions}
          // width={"50%"}
          // height={"400px"}
        />
        <Chart
          chartType="PieChart"
          data={categoryData}
          options={categoryOptions}
          // width={"50%"}
          // height={"400px"}
        />
      </div>
    </main>
  );
};

export default SuperDashboard;
