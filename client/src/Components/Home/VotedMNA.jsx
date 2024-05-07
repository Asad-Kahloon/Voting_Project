import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VotedMNA = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const cnicString = localStorage.getItem("current user");
    const cnic = parseInt(cnicString.replace(/"/g, ""), 10);

    axios
      .patch(`http://localhost:3001/voter/votedmna?cnic=${cnic}`)
      .then((res) => {
        if (res.data.updated) {
          console.log("Voted MNA");
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

export default VotedMNA;
