/**
 * A reusable authentication form component for both login and registration.
 * It handles form state, user input, validation, and API submission.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { login, register } from "../services/authService";

export default function AuthForm({ type }) {
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // State for client-side validation errors
  const [errors, setErrors] = useState({});
  // State for errors returned from the API
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const isLogin = type === "login";

  // Updates form data on input change and clears related validation errors.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };
  
  // Validates the form fields and sets errors if any are found.
  const validate = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handles form submission, including validation and API calls.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    // Stop submission if validation fails
    if (!validate()) {
      return;
    }

    try {
      if (isLogin) {
        const { name, ...loginData } = formData;
        await login(loginData);
      } else {
        await register(formData);
      }
      
      alert(`${isLogin ? "Logged in" : "Registered"} successfully!`);
      navigate("/dashboard");
    } catch (err) {
      setApiError(err.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-96 space-y-4"
      noValidate // Disable default browser validation
    >
      <h2 className="text-2xl font-semibold text-center">
        {isLogin ? "Login" : "Register"}
      </h2>

      {/* Conditional rendering for the 'Name' field in registration form */}
      {!isLogin && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className={`mt-1 w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      {apiError && <div className="text-red-500 text-sm text-center">{apiError}</div>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isLogin ? "Login" : "Register"}
      </button>

      {/* Toggle between Login and Register views */}
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

// PropTypes for type-checking the 'type' prop
AuthForm.propTypes = {
  type: PropTypes.oneOf(["login", "register"]).isRequired,
};
