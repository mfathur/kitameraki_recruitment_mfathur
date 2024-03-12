import { BrowserRouter } from "react-router-dom";
import AppRouter from "./pages/router";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
