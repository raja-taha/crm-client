import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice"; // Update to use `registerUser`
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)); // Update to use `registerUser`
  };

  useEffect(() => {
    if (isError) {
      toast.error(message); // Display error toast
    }

    if (isSuccess && user) {
      toast.success(message); // Display success toast
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }

    dispatch(reset()); // Reset the state after showing the success toast
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <div>
      <div className="h-screen m-auto flex justify-center items-center">
        <div className="mx-auto my-5 border-black border-2 p-5 rounded-lg">
          <h1 className="text-[36px] font-inter font-medium mb-3">
            Register for an Account
          </h1>
          <p className="text-[16px] font-poppins mb-10">
            Please fill in the details below to create an account
          </p>
          <form onSubmit={handleSubmit} className="text-[16px] font-poppins">
            <div className="border-b-2 border-opacity-30 border-b-black focus-within:border-opacity-80 mb-5">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="focus:outline-none w-full"
                value={name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="border-b-2 border-opacity-30 border-b-black focus-within:border-opacity-80 mb-5">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="focus:outline-none w-full"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="border-b-2 border-opacity-30 border-b-black focus-within:border-opacity-80 mb-5">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="focus:outline-none w-full"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="border-b-2 border-opacity-30 border-b-black focus-within:border-opacity-80 mb-10">
              <select
                id="role"
                name="role"
                className="focus:outline-none w-full"
                value={role}
                required
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-black text-white p-3 text-[16px] font-medium font-poppins rounded-lg w-full hover:bg-hoverButton my-5"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
