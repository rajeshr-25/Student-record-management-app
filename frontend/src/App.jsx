import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    studentName: "",
    grade: "",
    subject: ""
  });
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    setLoading(true);
    const res = await API.get("/students");
    setStudents(res.data);
    setLoading(false);
  };

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);
      const res = await API.get("/students");
      setStudents(res.data);
      setLoading(false);
    };
    loadStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await API.put(`/students/${editId}`, form);
    } else {
      await API.post("/students", form);
    }

    setForm({ studentName: "", grade: "", subject: "" });
    setEditId(null);
    fetchStudents();
  };

  const handleEdit = (s) => {
    setEditId(s._id);
    setForm({
      studentName: s.studentName,
      grade: s.grade,
      subject: s.subject
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm deletion?")) return;
    await API.delete(`/students/${id}`);
    fetchStudents();
  };

  const filteredStudents = students.filter(s =>
    s.studentName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="bg-slate-800 text-white px-8 py-4">
        <h1 className="text-2xl font-semibold">
          Student Record Management System
        </h1>
      </header>

      <div className="max-w-6xl mx-auto p-6">

        {/* Form Panel */}
        <section className="bg-white border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            {editId ? "Edit Student Details" : "Add New Student"}
          </h2>

          <form className="grid md:grid-cols-4 gap-4" onSubmit={handleSubmit}>
            <input
              className="border border-slate-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-500"
              placeholder="Student Name"
              value={form.studentName}
              onChange={(e) =>
                setForm({ ...form, studentName: e.target.value })
              }
              required
            />

            <input
              className="border border-slate-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-500"
              placeholder="Grade"
              value={form.grade}
              onChange={(e) =>
                setForm({ ...form, grade: e.target.value })
              }
              required
            />

            <input
              className="border border-slate-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-500"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              required
            />

            <div className="flex gap-2">
              <button className="bg-slate-800 text-white rounded px-4">
                {editId ? "Update" : "Add"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm({ studentName: "", grade: "", subject: "" });
                  }}
                  className="border border-slate-400 text-slate-700 rounded px-4"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Search */}
        <div className="mb-4 flex justify-end">
          <input
            className="border border-slate-300 p-2 rounded w-64"
            placeholder="Search by student name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <section className="bg-white border rounded-lg">
          {loading ? (
            <p className="p-6 text-center text-slate-500">
              Loading records...
            </p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-200">
                <tr>
                  <th className="p-3 border">Student Name</th>
                  <th className="p-3 border">Grade</th>
                  <th className="p-3 border">Subject</th>
                  <th className="p-3 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50">
                    <td className="p-3 border">{s.studentName}</td>
                    <td className="p-3 border">{s.grade}</td>
                    <td className="p-3 border">{s.subject}</td>
                    <td className="p-3 border text-center space-x-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="text-blue-700 underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="text-red-700 underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-slate-500">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>

      </div>
    </div>
  );
}

export default App;
