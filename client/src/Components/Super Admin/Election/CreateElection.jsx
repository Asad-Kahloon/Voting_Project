import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateElection = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) {
      alert("please fill out all fields");
    } else {
      axios
        .post("http://localhost:3001/election/add", { title, date })
        .then((res) => {
          if (res.data.election_created) {
            navigate("/superadmin/viewelection");
          } else if (!res.data.election_created) {
            alert(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    if (selectedDate < currentDate) {
      // If selected date is in the past, set date to current date
      setDate(currentDate);
    } else {
      // If selected date is in the future, set date to selected date
      setDate(selectedDate);
    }
  };

  return (
    <main className="main-container">
      <div className="login-page">
        <div className="login-container">
          <h2>Add Election</h2>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Election Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              placeholder="Enter Date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleDateChange}
            />
          </div>
          <button className="btn-login" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </div>
    </main>
  );
};

export default CreateElection;
