import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Income from "./Pages/Income";
import Expense from "./Pages/Expense";
import Category from "./Pages/Category";
import Filter from "./Pages/Filter";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";

const App = () => {
  const ProtectedRoute = ({ children }) => {
    const isAuthorized = !!localStorage.getItem("token");
    return isAuthorized ? children : <Navigate to="/login" replace />;
  };

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <Income />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense"
            element={
              <ProtectedRoute>
                <Expense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/filter"
            element={
              <ProtectedRoute>
                <Filter />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const Root = () => {
  const isAuthorized = !!localStorage.getItem("token");
  return isAuthorized ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default App