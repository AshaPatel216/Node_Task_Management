import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { login, register } from "../services/authService";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isLogin = type === "login";

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let data;
      if (isLogin) {
        const { name, ...loginData } = formData;
        data = await login(loginData);
      } else {
        data = await register(formData);
      }
      alert(`${isLogin ? "Logged in" : "Registered"} successfully!`);
      navigate(isLogin ? "/" : "/login");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-80 space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">
        {isLogin ? "Login" : "Register"}
      </h2>

      {!isLogin && (
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      )}

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        required
      />

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isLogin ? "Login" : "Register"}
      </button>

      <div className="text-sm text-center">
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-600 underline"
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 underline"
            >
              Login
            </button>
          </>
        )}
      </div>
    </form>
  );
}

AuthForm.propTypes = {
  type: PropTypes.oneOf(["login", "register"]).isRequired,
};
