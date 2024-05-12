import { useNavigate, useRouteError } from "react-router-dom";
import './Error.css';
import './Mobile.css'

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div className="error-box">
      <div className="error-box-item">
        <h1>Something went wrong 😥</h1>
        <p>{error.data || error.message}</p>
        <button onClick={() => handleNavigate("/")}>Go to Home</button>
      </div>
    </div>
  );
}

export default Error;
