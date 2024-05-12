import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authApi";
import { useAuthCont } from "../../context/AuthContext";
import './Login.css';
import './Mobile.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthCont();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const res = await loginUser({
        email,
        password,
      });

      if (res?.accessToken) {
        login(res.accessToken, res.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred, Please try again later.");
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <span className="login-box-title">Login to your account</span>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="label-email">
            <label className="login-form-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-form-input"
            />
          </div>
          <div className="label-password">
            <label className="login-form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-form-input"
            />
          </div>
          <button type="submit" className="login-form-button">
            Login now
          </button>
          <div className="login-form-register">
            <span className="login-form-register-desc">
              Don't have an account ?
            </span>
            <Link to="/register" className="login-form-register-link">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
