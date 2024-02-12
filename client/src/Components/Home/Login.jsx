import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("voter");

  axios.defaults.withCredentials = true;
  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/auth/login", { cnic, password, role })
      .then((res) => {
        if (res.data.login && res.data.role === "superadmin") {
          // setRoleVar('superadmin')
          localStorage.setItem("current user", JSON.stringify(cnic));
          navigate("/superadmin");
        } else if (res.data.login && res.data.role === "subadmin") {
          // setRoleVar('subadmin')
          localStorage.setItem("current user", JSON.stringify(cnic));
          navigate("/subadmin");
        } else if (res.data.login && res.data.role === "voter") {
          localStorage.setItem("current user", JSON.stringify(cnic));
          // setRoleVar('voter')
          navigate("/voterdash");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Cnic</label>
          <input
            type="number"
            placeholder="cnic without dashes"
            onChange={(e) => setCnic(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="voter">Voter</option>
            <option value="subadmin">Sub Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>

        <button className="btn-login" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
