import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VotedMNA = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const cnic = localStorage.getItem("current user");

    axios
      .put(`http://localhost:3001/candidate/updatecandidatevoteandvotermna`, {
        params: { cnic, id },
      })
      .then((res) => {
        if (res.data.updated) {
          navigate("/ballot");
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating candidate vote:", error);
      });
  }, [id]); // Add id to the dependency array if it can change

  return null; // or your JSX if needed
};

export default VotedMNA;
