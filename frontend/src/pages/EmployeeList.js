import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(true); // 👈 new polish

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } finally {
      setLoading(false);
    }
  };

  // Search request
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!department && !position) return loadEmployees(); // cleaner

    const res = await api.get("/search", {
      params: {
        ...(department && { department }),
        ...(position && { position })
      }
    });

    setEmployees(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    await api.delete(`/employees/${id}`);
    loadEmployees();
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold">Employees List</h2>

      {/* Top controls */}
      <div className="d-flex justify-content-between mb-3 align-items-center">
        <Link className="btn btn-primary" to="/employees/new">
          ➕ Add Employee
        </Link>

        <form className="d-flex gap-2" onSubmit={handleSearch}>
          <input
            className="form-control"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <input
            className="form-control"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <button className="btn btn-dark px-4">Search</button>
        </form>
      </div>

      {/* Loading message */}
      {loading && <p className="text-center">Loading employees...</p>}

      {/* Table */}
      {!loading && (
        <table className="table table-striped text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th style={{ width: "220px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.email}</td>

                  <td>
                    <div className="btn-group">
                      <Link className="btn btn-info btn-sm" to={`/employees/${emp._id}`}>
                        View
                      </Link>
                      <Link className="btn btn-primary btn-sm" to={`/employees/${emp._id}/edit`}>
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(emp._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-muted py-3">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
