import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VotedMPA = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  axios.defaults.withCredentials = true; // Assuming you're getting the candidate ID from the URL

  useEffect(() => {
    // Get CNIC from local storage
    const cnic = localStorage.getItem("current user");

    axios
      .put(
        `http://localhost:3001/candidate/updatecandidatevoteandvotervotempa?cnic=${cnic}` +
          id
      )
      .then((res) => {
        if (res.data.updated) {
          navigate("/ballot");
        }
      });
  }, []);
};

export default VotedMPA;
