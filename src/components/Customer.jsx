import React from "react";
import { useNavigate } from "react-router-dom";

const Customer = ({ customer }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/customer/${customer._id}`);
  };
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 my-2 p-3 border border-gray-300 rounded cursor-pointer hover:shadow-md"
      onClick={handleClick}
    >
      <p>
        <strong>Name:</strong> {customer.name}
      </p>
      <p>
        <strong>Email:</strong> {customer.email}
      </p>
      <p>
        <strong>Country:</strong> {customer.address.country}
      </p>
    </div>
  );
};

export default Customer;
