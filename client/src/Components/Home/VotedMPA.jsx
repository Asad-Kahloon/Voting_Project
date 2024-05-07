import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VotedMPA = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const cnicString = localStorage.getItem("current user"); // Retrieve as string
    const cnic = parseInt(cnicString.replace(/"/g, ""), 10); // Remove quotes and parse as integer
    console.log(cnic);

    axios
      .patch(`http://localhost:3001/voter/votedmpa?cnic=${cnic}`)
      .then((res) => {
        if (res.data.updated) {
          console.log("Voted MPA");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios.put(`http://localhost:3001/candidate/votes/` + id).then((res) => {
      if (res.data.updated) {
        navigate("/ballot");
      }
      console.log(res);
    });
  }, []);
};

export default VotedMPA;
