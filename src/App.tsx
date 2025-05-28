import { AuthProvider } from "./contexts/AuthProvider";
import RoutesApp from "./routes";

export default function App() {
  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  );
}
