// import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const DeleteParty = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   useEffect(() => {
//     axios.delete("http://localhost:3001/party/delete/" + id).then((res) => {
//       if (res.data.deleted) {
//         navigate("/superadmin/viewparty");
//       }
//     });
//   }, []);
// };

// export default DeleteParty;

import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteParty = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteParty = async () => {
      try {
        const response = await axios.delete(
          "http://localhost:3001/party/delete/" + id
        );
        if (response.data.deleted) {
          navigate("/superadmin/viewparty");
        }
      } catch (error) {
        console.error("Error deleting party:", error);
      }
    };

    deleteParty();
  }, [id, navigate]);

  // This component should return null or some UI elements,
  // otherwise it will render nothing.
  return null;
};

export default DeleteParty;
