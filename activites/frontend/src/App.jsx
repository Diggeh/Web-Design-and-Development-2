import Login from "./pages/login";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Login></Login>
      </AuthProvider>
    </>
  );
}

export default App;
