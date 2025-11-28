import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeList from "./pages/EmployeeList";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeView from "./pages/EmployeeView";
import Navbar from "./components/Navbar";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <EmployeeList />
              </PrivateRoute>
            }
          />

          <Route
            path="/employees/new"
            element={
              <PrivateRoute>
                <EmployeeForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/employees/:id/edit"
            element={
              <PrivateRoute>
                <EmployeeForm editMode />
              </PrivateRoute>
            }
          />

          <Route
            path="/employees/:id"
            element={
              <PrivateRoute>
                <EmployeeView />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
