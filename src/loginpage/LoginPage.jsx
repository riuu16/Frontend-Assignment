import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Userservices from "../services/user.services";
import "./login.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setErrors({ ...errors, username: null });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: null });
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmithandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(username, password, rememberMe);

      try {
        await Userservices.login(username, password, rememberMe).then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert(res.data.message);
            navigate("/");
          }
          if (
            res.status === 401 ||
            res.status === 400 ||
            res.status === 403 ||
            res.status === 503
          ) {
            alert(res.data.Error[0].message);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={onSubmithandler}>
      <div>
        <label htmlFor="username">Username/Email:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        {errors.username && <div className="error">{errors.username}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div className="checkbox">
        <input
          type="checkbox"
          id="remember-me"
          checked={rememberMe}
          onChange={handleRememberMeChange}
        />
        <label htmlFor="remember-me" className="inline">
          Remember me
        </label>
      </div>
      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
}

export default LoginPage;
