import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

export default function EmployeeView() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        setEmp(res.data);
      } catch (err) {
        setError("Failed to load employee details");
      }
    };
    load();
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!emp) return <p>Loading...</p>;

  return (
    <div className="col-md-6 mx-auto">
      <h2 className="text-center mb-4">View Employee Details</h2>

      <div className="card p-3">
        {emp.profileImage && (
          <img
            src={`http://localhost:5001${emp.profileImage}`}
            alt="Profile"
            style={{ maxWidth: "150px", marginBottom: "1rem" }}
          />
        )}

        <p>
          <strong>Employee First Name:</strong> {emp.firstName}
        </p>
        <p>
          <strong>Employee Last Name:</strong> {emp.lastName}
        </p>
        <p>
          <strong>Employee Email:</strong> {emp.email}
        </p>
        <p>
          <strong>Department:</strong> {emp.department}
        </p>
        <p>
          <strong>Position:</strong> {emp.position}
        </p>
      </div>

      <div className="mt-3">
        <Link className="btn btn-secondary" to="/employees">
          Back to Employees
        </Link>
      </div>
    </div>
  );
}
