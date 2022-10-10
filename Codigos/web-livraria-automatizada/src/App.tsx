import { BrowserRouter } from "react-router-dom";
import Base from "./components/Base/Base";
import store from "./configs/store/store";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <Base />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
