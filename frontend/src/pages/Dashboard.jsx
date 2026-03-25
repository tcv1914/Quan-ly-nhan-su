import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    salary: "",
  });
  const [editId, setEditId] = useState(null);

  // 🔄 load data
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      alert("Lỗi load dữ liệu");
    }
  };

  // ➕ CREATE
  const handleCreate = async () => {
    try {
      await API.post("/employees", form);
      resetForm();
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("Lỗi thêm nhân viên");
    }
  };

  // ✏️ UPDATE
  const handleUpdate = async () => {
    try {
      await API.put(`/employees/${editId}`, form);
      resetForm();
      setEditId(null);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("Lỗi cập nhật");
    }
  };

  // 🗑️ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Xoá nhân viên này?")) return;

    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("Lỗi xoá");
    }
  };

  // 🧹 reset form
  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      position: "",
      salary: "",
    });
  };

  // 📥 fill form khi edit
  const handleEdit = (emp) => {
    setForm(emp);
    setEditId(emp.id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Management</h1>

      {/* FORM */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <div className="grid grid-cols-2 gap-3">
          <input
            className="border p-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="border p-2"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="border p-2"
            placeholder="Position"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
          <input
            className="border p-2 col-span-2"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
        </div>

        <div className="mt-4 flex gap-2">
          {user.role !== "employee" && (
            <button onClick={editId ? handleUpdate : handleCreate}>
              {editId ? "Update" : "Add"}
            </button>
          )}

          <button
            onClick={resetForm}
            className="px-4 py-2 bg-gray-400 text-white"
          >
            Clear
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((e) => (
                <tr key={e.id} className="text-center border-t">
                  <td className="p-2">{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                  <td>{e.position}</td>
                  <td>{e.salary}</td>
                  <td className="flex justify-center gap-2 py-2">
                    <button
                      onClick={() => handleEdit(e)}
                      className="bg-blue-500 text-white px-2 py-1"
                    >
                      Edit
                    </button>

                    {user.role === "admin" && (
                      <button onClick={() => handleDelete(e.id)}>Delete</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
