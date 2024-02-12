import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteProvince = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios.delete("http://localhost:3001/province/delete/" + id).then((res) => {
      if (res.data.deleted) {
        navigate("/superadmin/viewprovince");
      }
    });
  }, []);
};

export default DeleteProvince;
