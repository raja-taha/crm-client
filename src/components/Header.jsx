import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import logoutIcon from "../assets/logoutIcon.png";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <header className="border-b-2 border-opacity-30 border-b-black h-[100px] md:h-[80px] flex items-center relative">
      <div className="w-[80%] mx-auto text-center flex flex-col md:flex-row md:justify-between items-center">
        <Link to={"/"} className="text-[24px] font-bold tracking-wide">
          Admin Dashboard
        </Link>
        {user && (
          <div className="flex gap-5">
            <Link
              to={"/register"}
              className="flex items-center justify-center text-white p-2 hover:bg-opacity-70 bg-black rounded"
            >
              Add Users
            </Link>
            <Link
              onClick={handleLogout}
              className="flex items-center justify-center text-white p-2 hover:bg-opacity-70 bg-black rounded"
            >
              <img src={logoutIcon} alt="logout" className="w-5 md:w-6" />
              <span className="ml-2">Logout</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
