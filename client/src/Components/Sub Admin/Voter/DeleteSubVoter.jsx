import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteSubVoter = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios.delete("http://localhost:3001/voter/subdelete/" + id).then((res) => {
      if (res.data.deleted) {
        navigate("/subadmin/viewvoter");
      }
    });
  }, []);
};

export default DeleteSubVoter;
