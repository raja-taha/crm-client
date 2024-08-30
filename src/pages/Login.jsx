import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, reset } from "../features/auth/authSlice"; // Update to use `loginUser`
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)); // Update to use `loginUser`
  };

  useEffect(() => {
    if (isError) {
      toast.error(message); // Display error toast
    }

    if (isSuccess && user) {
      toast.success(message); // Display success toast
      setTimeout(() => {
        navigate("/");
      }, 0);
    }

    dispatch(reset()); // Reset the state after showing the messages
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <div>
      <div className="h-screen m-auto flex justify-center items-center">
        <div className="mx-auto my-5 border-black border-2 p-5 rounded-lg">
          <h1 className="text-[36px] font-inter font-medium mb-3">
            Only Admins are allowed
          </h1>
          <p className="text-[16px] font-poppins mb-10">
            Please login using admin credentials
          </p>
          <form onSubmit={handleSubmit} className="text-[16px] font-poppins">
            <div className="border-b-2 border-opacity-30 border-b-black focus-within:border-opacity-80 mb-5">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="focus:outline-none w-full"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="border-b-2 border-opacity-30 border-b-black focus-within:border-opacity-80 mb-10">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="focus:outline-none w-full"
                value={password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white p-3 text-[16px] font-medium font-poppins rounded-lg w-full hover:bg-hoverButton my-5"
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
