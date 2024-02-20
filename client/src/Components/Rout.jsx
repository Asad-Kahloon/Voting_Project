import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Home Start

import Home_Interface from "./Home/Home_Interface";
import Home from "./Home/Home";
import Login from "./Home/Login";
import Logout from "./Home/Logout";

import VoterDash from "./Home/VoterDash";
import VoterBallot from "./Home/VoterBallot";

import VotedMPA from "./Home/VotedMPA";
import VotedMNA from "./Home/VotedMNA";

// Super Admin Start

import SuperAdmin_Interface from "./Super Admin/SuperAdmin_Interface";
import SuperDashboard from "./Super Admin/SuperDashboard";

import ViewElection from "./Super Admin/Election/ViewElection";
import CreateElection from "./Super Admin/Election/CreateElection";
import DeleteElection from "./Super Admin/Election/DeleteElection";
import UpdateElection from "./Super Admin/Election/UpdateElection";

import AddSubadmin from "./Super Admin/Sub Admin/AddSubadmin";
import ViewSubadmin from "./Super Admin/Sub Admin/ViewSubadmin";
import DeleteSubadmin from "./Super Admin/Sub Admin/DeleteSubadmin";
import UpdateSubadmin from "./Super Admin/Sub Admin/UpdateSubadmin";

import AddCandidate from "./Super Admin/Candidate/AddCandidate";
import ViewCandidate from "./Super Admin/Candidate/ViewCandidate";
import UpdateCandidate from "./Super Admin/Candidate/UpdateCandidate";
import DeleteCandidate from "./Super Admin/Candidate/DeleteCandidate";

import AddVoter from "./Super Admin/Voter/AddVoter";
import ViewVoter from "./Super Admin/Voter/ViewVoter";
import DeleteVoter from "./Super Admin/Voter/DeleteVoter";
import UpdateVoter from "./Super Admin/Voter/UpdateVoter";

import AddParty from "./Super Admin/Party/AddParty";
import ViewParty from "./Super Admin/Party/ViewParty";
import DeleteParty from "./Super Admin/Party/DeleteParty";

import AddProvince from "./Super Admin/Province/AddProvince";
import ViewProvince from "./Super Admin/Province/ViewProvince";
import UpdateProvince from "./Super Admin/Province/UpdateProvince";
import DeleteProvince from "./Super Admin/Province/DeleteProvince";

import AddDistrict from "./Super Admin/District/AddDistrict";
import ViewDistrict from "./Super Admin/District/ViewDistrict";
import DeleteDistrict from "./Super Admin/District/DeleteDistrict";
import UpdateDistrict from "./Super Admin/District/UpdateDistrict";

import AddConstituency from "./Super Admin/Constituency/AddConstituency";
import ViewConstituency from "./Super Admin/Constituency/ViewConstituency";
import DeleteConstituency from "./Super Admin/Constituency/DeleteConstituency";
import UpdateConstituency from "./Super Admin/Constituency/UpdateConstituency";

import AddCategory from "./Super Admin/Category/AddCategory";
import ViewCategory from "./Super Admin/Category/ViewCategory";
import DeleteCategory from "./Super Admin/Category/DeleteCategory";

// Super Admin End

// Sub Admin Start

import SubAdmin_Interface from "./Sub Admin/SubAdmin_Interface";
import SubDashboard from "./Sub Admin/SubDashboard";

import AddSubConstituency from "./Sub Admin/Constituency/AddSubConstituency";
import ViewSubConstituency from "./Sub Admin/Constituency/ViewSubConstituency";
import DeleteSubConstituency from "./Sub Admin/Constituency/DeleteSubConstituency";
import UpdateSubConstituency from "./Sub Admin/Constituency/UpdateSubConstituency";

import AddSubVoter from "./Sub Admin/Voter/AddSubVoter";
import ViewSubVoter from "./Sub Admin/Voter/ViewSubVoter";
import DeleteSubVoter from "./Sub Admin/Voter/DeleteSubVoter";
import UpdateSubVoter from "./Sub Admin/Voter/UpdateSubVoter";

import AddSubCandidate from "./Sub Admin/Candidate/AddSubCandidate";
import ViewSubCandidate from "./Sub Admin/Candidate/ViewSubCandidate";
import DeleteSubCandidate from "./Sub Admin/Candidate/DeleteSubCandidate";
import UpdateSubCandidate from "./Sub Admin/Candidate/UpdateSubCandidate";

// Sub Admin End

const Rout = () => {
  const [role, setRole] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verify")
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role);
        } else {
          setRole("");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home_Interface role={role} />}>
        <Route index element={<Home />}></Route>
        <Route path="login" element={<Login setRoleVar={setRole} />}></Route>
        <Route path="logout" element={<Logout setRole={setRole} />}></Route>

        <Route path="voterdash" element={<VoterDash />}></Route>
        <Route path="ballot" element={<VoterBallot />}></Route>
        <Route path="votedmpa/:id" element={<VotedMPA />}></Route>
        <Route path="votedmna/:id" element={<VotedMNA />}></Route>
      </Route>

      <Route path="/superadmin" element={<SuperAdmin_Interface role={role} />}>
        <Route index element={<SuperDashboard />}></Route>

        <Route path="viewelection" element={<ViewElection />}></Route>
        <Route path="createelection" element={<CreateElection />}></Route>
        <Route path="deleteelection/:id" element={<DeleteElection />}></Route>
        <Route path="updateelection/:id" element={<UpdateElection />}></Route>

        <Route path="addsubadmin" element={<AddSubadmin />}></Route>
        <Route path="viewsubadmin" element={<ViewSubadmin />}></Route>
        <Route path="deletesubadmin/:id" element={<DeleteSubadmin />}></Route>
        <Route path="updatesubadmin/:id" element={<UpdateSubadmin />}></Route>

        <Route path="addcandidate" element={<AddCandidate />}></Route>
        <Route path="viewcandidate" element={<ViewCandidate />}></Route>
        <Route path="updatecandidate/:id" element={<UpdateCandidate />}></Route>
        <Route path="deletecandidate/:id" element={<DeleteCandidate />}></Route>

        <Route path="addvoter" element={<AddVoter />}></Route>
        <Route path="viewvoter" element={<ViewVoter />}></Route>
        <Route path="deletevoter/:id" element={<DeleteVoter />}></Route>
        <Route path="updatevoter/:id" element={<UpdateVoter />}></Route>

        <Route path="addparty" element={<AddParty />}></Route>
        <Route path="viewparty" element={<ViewParty />}></Route>
        <Route path="deleteparty/:id" element={<DeleteParty />}></Route>

        <Route path="viewprovince" element={<ViewProvince />}></Route>
        <Route path="addprovince" element={<AddProvince />}></Route>
        <Route path="updateprovince/:id" element={<UpdateProvince />}></Route>
        <Route path="deleteprovince/:id" element={<DeleteProvince />}></Route>

        <Route path="adddistrict" element={<AddDistrict />}></Route>
        <Route path="viewdistrict" element={<ViewDistrict />}></Route>
        <Route path="deletedistrict/:id" element={<DeleteDistrict />}></Route>
        <Route path="updatedistrict/:id" element={<UpdateDistrict />}></Route>

        <Route path="addconstituency" element={<AddConstituency />}></Route>
        <Route path="viewconstituency" element={<ViewConstituency />}></Route>
        <Route
          path="deleteconstituency/:id"
          element={<DeleteConstituency />}
        ></Route>
        <Route
          path="updateconstituency/:id"
          element={<UpdateConstituency />}
        ></Route>

        <Route path="addcategory" element={<AddCategory />}></Route>
        <Route path="viewcategory" element={<ViewCategory />}></Route>
        <Route path="deletecategory/:id" element={<DeleteCategory />}></Route>
      </Route>

      <Route path="/subadmin" element={<SubAdmin_Interface role={role} />}>
        <Route index element={<SubDashboard />}></Route>

        <Route path="addconstituency" element={<AddSubConstituency />}></Route>
        <Route
          path="viewconstituency"
          element={<ViewSubConstituency />}
        ></Route>
        <Route
          path="deleteconstituency/:id"
          element={<DeleteSubConstituency />}
        ></Route>
        <Route
          path="updateconstituency/:id"
          element={<UpdateSubConstituency />}
        ></Route>

        <Route path="addvoter" element={<AddSubVoter />}></Route>
        <Route path="viewvoter" element={<ViewSubVoter />}></Route>
        <Route path="deletevoter/:id" element={<DeleteSubVoter />}></Route>
        <Route path="updatevoter/:id" element={<UpdateSubVoter />}></Route>

        <Route path="addcandidate" element={<AddSubCandidate />}></Route>
        <Route path="viewcandidate" element={<ViewSubCandidate />}></Route>
        <Route
          path="deletecandidate/:id"
          element={<DeleteSubCandidate />}
        ></Route>
        <Route
          path="updatecandidate/:id"
          element={<UpdateSubCandidate />}
        ></Route>
      </Route>
    </Routes>
  );
};

export default Rout;
