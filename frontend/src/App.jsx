import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;