import "@/assets/css/index.css";
import { AuthProvider } from "@/context/AuthProvider";
import { MoodProvider } from "@/context/MoodProvider";
import Router from "@/router/Router";

function App() {
  return (
    <AuthProvider>
      <MoodProvider>
        <Router />
      </MoodProvider>
    </AuthProvider>
  );
}

export default App;
