import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AuthContextProvider from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
