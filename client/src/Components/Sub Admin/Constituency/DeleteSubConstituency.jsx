import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteSubConstituency = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .delete("http://localhost:3001/constituency/subdelete/" + id)
      .then((res) => {
        if (res.data.deleted) {
          navigate("/subadmin/viewconstituency");
        }
      });
  }, []);
};

export default DeleteSubConstituency;
