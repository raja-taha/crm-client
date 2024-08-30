import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

const Customer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    education: [{ degree: "", institution: "", yearOfCompletion: "" }],
    address: { street: "", city: "", state: "", postalCode: "", country: "" },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/customer/${id}`,
          config
        );
        setCustomerData(response.data);
      } catch (error) {
        setError("Failed to fetch customer data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], [name]: value };
      return { ...prev, education: newEducation };
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const addEducationField = () => {
    setCustomerData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", institution: "", yearOfCompletion: "" },
      ],
    }));
  };

  const removeEducationField = (index) => {
    setCustomerData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/customer/${id}`,
        customerData,
        config
      );
      toast.success("Customer updated successfully.");
      // Optionally, you can redirect or fetch the updated data
    } catch (error) {
      toast.error("Failed to update customer.");
    }
  };

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/customer/${id}`,
        config
      );
      toast.success("Customer deleted successfully.");
      navigate("/"); // Redirect after deletion
    } catch (error) {
      toast.error("Failed to delete customer.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center my-10">
        <Spinner />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-[24px] font-semibold mb-5">Customer Details</h1>
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-[20px] font-semibold">Personal Information</p>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block mb-1">Name:</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={customerData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={customerData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-1">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={customerData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <p className="text-[20px] font-semibold mt-5">
              Address Information
            </p>
            <div>
              <div>
                <label className="block mb-1">Street:</label>
                <input
                  type="text"
                  name="street"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={customerData.address.street}
                  onChange={handleAddressChange}
                />
              </div>

              <div>
                <label className="block mb-1">City:</label>
                <input
                  type="text"
                  name="city"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={customerData.address.city}
                  onChange={handleAddressChange}
                />
              </div>

              <div>
                <label className="block mb-1">State:</label>
                <input
                  type="text"
                  name="state"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={customerData.address.state}
                  onChange={handleAddressChange}
                />
              </div>

              <div>
                <label className="block mb-1">Postal Code:</label>
                <input
                  type="text"
                  name="postalCode"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={customerData.address.postalCode}
                  onChange={handleAddressChange}
                />
              </div>

              <div>
                <label className="block mb-1">Country:</label>
                <input
                  type="text"
                  name="country"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={customerData.address.country}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
          </div>

          <div className="">
            <p className="text-[20px] font-semibold">Education Details</p>
            {customerData.education.map((edu, index) => (
              <div key={index} className="mb-4 relative">
                <div>
                  <label className="block mb-1">Degree:</label>
                  <input
                    type="text"
                    name="degree"
                    placeholder="Degree"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, e)}
                  />
                </div>
                <div>
                  <label className="block mb-1">Institute:</label>
                  <input
                    type="text"
                    name="institution"
                    placeholder="Institution"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, e)}
                  />
                </div>
                <div>
                  <label className="block mb-1">Year of completion:</label>
                  <input
                    type="number"
                    name="yearOfCompletion"
                    placeholder="Year of Completion"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={edu.yearOfCompletion}
                    onChange={(e) => handleEducationChange(index, e)}
                  />
                </div>
                <button
                  type="button"
                  className="mt-2 bg-black text-white p-1 rounded"
                  onClick={() => removeEducationField(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-black text-white p-2 rounded"
              onClick={addEducationField}
            >
              Add Education Field
            </button>
          </div>
        </div>

        <div className="my-5">
          <button
            type="submit"
            className="bg-black text-white p-2 rounded mr-2"
          >
            Update Customer
          </button>

          <button
            type="button"
            className="bg-black text-white p-2 rounded"
            onClick={handleDelete}
          >
            Delete Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Customer;
