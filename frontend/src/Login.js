import { useState } from "react";
import API from "./api";

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await API.post("/login", form);
      localStorage.setItem("isAdmin", "true");
      onLogin();
    } catch {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow w-80"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          required
        />

        <input
          type="password"
          className="border p-2 w-full mb-4 rounded"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button className="bg-slate-800 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
