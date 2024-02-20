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
  }, [id]); // Include id in the dependency array

  return null; // Since this component doesn't render anything, you can return null
};

export default DeleteCandidate;
