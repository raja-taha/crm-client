import React, { useEffect, useState } from "react";
import AddCustomerModal from "../components/AddCustomerModal";
import Customer from "../components/Customer";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/`,
        config
      );
      setCustomers(response.data);
    } catch (error) {
      setError("Failed to fetch customers.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [token]);

  const handleCustomerAdded = () => {
    fetchCustomers();
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="w-[80%] mx-auto">
        <p className="text-[24px] font-semibold my-10">
          Welcome to your CRM dashboard!
        </p>
        <div>
          <div className="flex justify-between">
            <h2 className="text-[20px] font-semibold mb-4">Customers</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center text-white p-2 hover:bg-opacity-70 bg-black rounded"
            >
              Add Customer
            </button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center my-10">
              <Spinner />
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            customers.map((customer) => (
              <Customer key={customer.id} customer={customer} />
            ))
          )}
        </div>
      </div>
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCustomerAdded={handleCustomerAdded}
      />
    </div>
  );
};

export default Dashboard;
