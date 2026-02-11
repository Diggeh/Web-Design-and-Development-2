import Inventory from "./pages/inventory";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Inventory />
    </AuthProvider>
  );
}

export default App;
