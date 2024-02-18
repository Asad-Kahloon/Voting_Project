import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteCandidate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios.delete("http://localhost:3001/candidate/delete/" + id).then((res) => {
      if (res.data.deleted) {
        navigate("/superadmin/viewcandidate");
      }
    });
  }, []);
};

export default DeleteCandidate;
