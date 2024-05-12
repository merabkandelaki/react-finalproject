import { Navigate } from "react-router-dom";
import { decodeJwt } from "../utils/jwt.decoder";

const ProtectedRoute = ({ children }) => {
  const checkIsAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decodedToken = decodeJwt(token);
    const exp = decodedToken.exp;
    const now = Date.now() / 1000;

    return exp && exp > now;
  };

  const isAuth = checkIsAuth();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
