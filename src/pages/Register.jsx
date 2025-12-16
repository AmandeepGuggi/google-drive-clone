import { useNavigate } from "react-router-dom";
import { FaGoogleDrive } from "react-icons/fa";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
   const [serverError, setServerError] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

 const [formData, setFormData] = useState({
    name: "Anurag Singh",
    email: "anurag@gmail.com",
    password: "Abcd@12345",
  });

   const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("summited");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        
        <div className="flex items-center justify-center gap-2 mb-6">
          <FaGoogleDrive className="text-blue-500 text-3xl" />
          <span className="text-xl font-medium">Drive</span>
        </div>

        <h2 className="text-xl font-semibold text-center mb-1">
          Create your account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Use Drive with your account
        </p>

         <form className="form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
             className="w-full mb-4 rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            // If there's a serverError, add an extra class to highlight border
            className={` ${serverError ? "input-error" : ""} w-full mb-4 rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          {/* Absolutely-positioned error message below email field */}
          {serverError && <span className="error-msg">{serverError}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            className="w-full mb-4 rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full rounded-full bg-blue-600 py-2 text-white hover:bg-blue-700${isSuccess ? "bg-green" : ""}`}
        >
          {isSuccess ? "Registration Successful" : "Create account"}
        </button>
      </form>


        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
