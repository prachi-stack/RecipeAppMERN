import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook
import { Link } from "react-router-dom"; // Import Link for Register navigation

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Use navigate hook for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", formData);
      alert("Login Successful!");

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to home page after successful login
      navigate("/"); 
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message);
      alert("Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-[2rem]">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 bg-white rounded-md shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Login
        </button>

        {/* Register option for new users */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
