import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VotedMPA = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming you're getting the candidate ID from the URL

  useEffect(() => {
    // Get CNIC from local storage
    const cnic = localStorage.getItem("current user");

    // Check if CNIC and candidate ID are available
    if (cnic && id) {
      // Update votedmpa to 1 in the voter collection
      axios
        .post("http://localhost:3001/voter/updatevotempa", { cnic })
        .then((res) => {
          if (res.data.updated) {
            console.log("Successfully updated votedmpa to 1.");

            // After updating the voter's votedmpa, update the candidate's vote count
            axios
              .put(`http://localhost:3001/candidate/${id}/vote`)
              .then((res) => {
                console.log(
                  res.data,
                  "Candidate vote count updated successfully."
                );

                // Navigate to the next component after voting process completed
                navigate("/voterdash");
              })
              .catch((error) => {
                console.error("Error updating candidate vote count:", error);
              });
          } else {
            console.log("Failed to update votedmpa.");
          }
        })
        .catch((error) => {
          console.error("Error updating votedmpa:", error);
        });
    } else {
      console.error("No CNIC or candidate ID found.");
    }
  }, [id, navigate]);

  return null; // Component doesn't render anything
};

export default VotedMPA;
