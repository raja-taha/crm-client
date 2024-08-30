import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const AdminRoutes = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    // Show a loading spinner or placeholder while fetching user data
    return <div>Loading...</div>;
  }

  if (user?.role === "admin") {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  } else {
    // Redirect to login or display a not authorized message
    return <Navigate to="/login" />;
  }
};

export default AdminRoutes;
