import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthCont } from "../../context/AuthContext";
import { registerUser } from "../../services/authApi";
import './Register.css';
import './Mobile.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { login } = useAuthCont();

  const handleRegister = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const res = await registerUser({
          username,
          email,
          firstName,
          lastName,
          phoneNumber,
          password,
        });
        if (res?.accessToken) {
          login(res.accessToken, res?.user);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    const usernameRegex = /^.{3,12}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,20}$/;
    const phoneRegex = /^\d+$/;

    if (!username) {
      errors.username = "Username is required";
    } else if (!usernameRegex.test(username)) {
      errors.username = "Username must be between 3 and 12 characters";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!firstName) {
      errors.firstName = "First name is required";
    }

    if (!lastName) {
      errors.lastName = "Last name is required";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = "Phone number must contain only digits";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be between 6 and 20 characters, contain at least one uppercase letter and one digit";
    }

    if (!repeatPassword) {
      errors.repeatPassword = "Please repeat the password";
    } else if (password !== repeatPassword) {
      errors.repeatPassword = "Passwords do not match";
    }

    return errors;
  };

  return (
    <div className="register">
      <div className="register-box">
        <span className="register-box-title">Create an account</span>
        <form onSubmit={handleRegister} className="register-form">
          <div className="register-label-username">
            <label className="register-form-label">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register-form-input"
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>
          <div className="register-label-email">
            <label className="register-form-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-form-input"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="register-label-firstname">
            <label className="register-form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="register-form-input"
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>
          <div className="register-label-lastname">
            <label className="register-form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="register-form-input"
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
          <div className="register-label-phone">
            <label className="register-form-label">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="register-form-input"
            />
            {errors.phoneNumber && (
              <span className="error">{errors.phoneNumber}</span>
            )}
          </div>
          <div className="register-label-password">
            <label className="register-form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-form-input"
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div className="register-label-repeat-password">
            <label className="register-form-label">Repeat Password</label>
            <input
              type="password"
              name="repeatPassword"
              placeholder="Repeat password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="register-form-input"
            />
            {errors.repeatPassword && (
              <span className="error">{errors.repeatPassword}</span>
            )}
          </div>
          <button type="submit" className="register-form-button">
            Create account
          </button>
          <div className="register-form-login">
            <span className="register-form-login-desc">
              Already have an account ?
            </span>
            <Link to="/login" className="register-form-login-link">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
