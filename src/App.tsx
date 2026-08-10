import "@/assets/css/index.css";
import { AuthProvider } from "@/context/AuthProvider";
import Router from "@/router/Router";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
