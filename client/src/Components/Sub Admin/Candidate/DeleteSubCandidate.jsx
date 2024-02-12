import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteSubCandidate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .delete("http://localhost:3001/candidate/subdelete/" + id)
      .then((res) => {
        if (res.data.deleted) {
          navigate("/subadmin/viewcandidate");
        }
      });
  }, []);
};

export default DeleteSubCandidate;
