import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoutes from "./routes/AdminRoutes";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Customer from "./pages/Customer";

function App() {
  return (
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={2000} // Duration in milliseconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        draggable
        pauseOnFocusLos
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AdminRoutes />}>
          <Route path="" element={<Dashboard />} />
          <Route path="register" element={<Register />} />
          <Route path="customer/:id" element={<Customer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
