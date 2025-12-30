import { useNavigate } from "react-router-dom";
import { FaGoogleDrive } from "react-icons/fa";
import { useState, useEffect } from "react";
import {BASE_URL} from "../utility/index" 
import "./Auth.css"
export default function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

 const [formData, setFormData] = useState({
    fullname: "Amandeep Kaur",
    email: "a2guggi11052002@gmail.com",
    password: "Abcd@12345",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

   const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setServerError("");
      setOtpError("");
      setOtpSent(false);
      setOtpVerified(false);
      setCountdown(0);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

    // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

    // Send OTP handler
  const handleSendOtp = async () => {
    const { email } = formData;
    if (!email) {
      setOtpError("Please enter your email first.");
      return;
    }

    try {
      setIsSending(true);
      const res = await fetch(`${BASE_URL}/otp/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setCountdown(60); // allow resend after 60s
        setOtpError("");
      } else {
        setOtpError(data.error || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setOtpError("Something went wrong sending OTP.");
    } finally {
      setIsSending(false);
    }
  };

    // Verify OTP handler
  const handleVerifyOtp = async () => {
    const { email } = formData;
    if (!otp) {
      setOtpError("Please enter OTP.");
      return;
    }

    try {
      setIsVerifying(true);
      const res = await fetch(`${BASE_URL}/otp/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (res.ok) {
        setOtpVerified(true);
        setOtpError("");
      } else {
        setOtpError(data.error || "Invalid or expired OTP.");
      }
    } catch (err) {
      console.error(err);
      setOtpError("Something went wrong verifying OTP.");
    } finally {
      setIsVerifying(false);
    }
  };


  const handleRegisterSubmit =  async (e) => {
    e.preventDefault()
    setIsSuccess(false)
     if (!otpVerified) {
      setOtpError("Please verify your email with OTP before registering.");
      return;
    }
      try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        body: JSON.stringify({...formData, otp}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
  console.log("Server response:", data);
  setServerError( data.error || data.message || "Registration failed");
}
else if(data.status === 201){
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("Something went wrong. Please try again.");
    }
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

         <form className="form" onSubmit={handleRegisterSubmit}>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
             className="w-full mb-4 rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email */}
        <div className="form-group ">
          <label htmlFor="email" className="label">
            Email
          </label>
          <div className={`  flex items-center border justify- mb-4  rounded-md  focus:ring-2` }>
            <input
            // If there's a serverError, add an extra class to highlight border
            className={`  ${serverError ? "input-error" : ""} w-full  px-3 py-2 focus:outline-none focus:ring-blue-500`}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
           <button
              type="button"
              className={` ${isSending || countdown > 0 ? "bg-blue-200 cursor-not-allowed": "cursor-pointer bg-blue-600"} otp-button text-sm text-nowrap  text-white py-1.5 rounded px-2 m-1 `}
              onClick={handleSendOtp}
              disabled={isSending || countdown > 0}
            >
              {isSending
                ? "Sending..."
                : countdown > 0
                  ? `${countdown}s`
                  : "Send OTP"}
            </button>
          </div>
         {serverError && <span className="error-msg">{serverError}</span>}
        </div>

  {/* OTP Input + Verify */}
        {otpSent && (
          <div className="form-group">
            <label htmlFor="otp" className="label">
              Enter OTP
            </label>
            <div className={`  flex items-center border justify- mb-4  rounded-md  focus:ring-2` }>
              <input
                className={`w-full  px-3 py-2 focus:outline-none focus:ring-blue-500`}
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="4-digit OTP"
                maxLength={4}
                required
              />
              <button
                type="button"
                className={` ${isVerifying || otpVerified ? "bg-blue-300 cursor-not-allowed": "bg-blue-600 cursor-pointer"} otp-button text-sm text-nowrap  text-white py-1.5 rounded px-2 m-1 `}
                onClick={handleVerifyOtp}
                disabled={isVerifying || otpVerified}
              >
                {isVerifying
                  ? "Verifying..."
                  : otpVerified
                    ? "Verified"
                    : "Verify OTP"}
              </button>
            </div>
             {otpError && <span className="text-red-400">{otpError}</span>}
          </div>
        )}
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
         {/* Absolutely-positioned error message below email field */}
          {serverError && <span className=" top-0 text-red-800">{serverError}</span>}

        <button
          type="submit"
          className={`w-full rounded-full py-2 text-white ${isSuccess ? "bg-green-400 hover:bg-green-700 " : "bg-blue-600 hover:bg-blue-700 "}`}
          disabled={!otpVerified || isSuccess}
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
