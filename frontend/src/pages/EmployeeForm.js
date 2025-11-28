import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function EmployeeForm({ editMode }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const loadEmployee = async () => {
    try {
      const res = await api.get(`/employees/${id}`);
      setForm({
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        email: res.data.email || "",
        department: res.data.department || "",
        position: res.data.position || "",
      });
    } catch (err) {
      setError("Failed to load employee");
    }
  };

  useEffect(() => {
    if (editMode && id) {
      loadEmployee();
    }
    // eslint-disable-next-line
  }, [editMode, id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (profileImage) data.append("profileImage", profileImage);

      if (editMode) {
        await api.put(`/employees/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/employees", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/employees");
    } catch (err) {
      setError("Failed to save employee");
    }
  };

  return (
    <div className="col-md-6 mx-auto">
      <h2 className="text-center mb-4">
        {editMode ? "Update Employee" : "Add Employee"}
      </h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>Employee First Name</label>
          <input
            name="firstName"
            className="form-control"
            value={form.firstName}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Employee Last Name</label>
          <input
            name="lastName"
            className="form-control"
            value={form.lastName}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Employee Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Department</label>
          <input
            name="department"
            className="form-control"
            value={form.department}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label>Position</label>
          <input
            name="position"
            className="form-control"
            value={form.position}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label>Profile Picture</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </div>

        <button className="btn btn-success me-2">
          {editMode ? "Update" : "Save"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/employees")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
