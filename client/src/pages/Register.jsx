import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate(); // React Router hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        formData
      );
      alert(response.data.message);

      setRegistrationSuccess(true); // Success state
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 1000); // Delay for a smooth user experience
    } catch (error) {
      console.error("Registration Error:", error.response?.data?.message);
      alert("Registration Failed");

      // Clear input fields on failure
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex  items-center justify-center h-screen bg-gray-100 px-[2rem]">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 bg-white rounded-md shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>

      {/* Optional success message */}
      {registrationSuccess && (
        <p className="mt-4 text-green-600 font-semibold text-center">
          Registration Successful! Redirecting to login...
        </p>
      )}
    </div>
  );
};

export default Register;
