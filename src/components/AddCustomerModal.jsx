// src/components/AddCustomerModal.js
import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal"; // Reuse the Modal component
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddCustomerModal = ({ isOpen, onClose, onCustomerAdded }) => {
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: [{ degree: "", institution: "", yearOfCompletion: "" }],
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setFormData((prev) => ({
      ...prev,
      education: newEducation,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const addEducationField = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", institution: "", yearOfCompletion: "" },
      ],
    }));
  };

  const removeEducationField = (index) => {
    if (index === 0) {
      return null;
    }
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/customer/`,
        formData,
        config
      );
      toast.success("Customer added successfully");
      onCustomerAdded();
      onClose();
    } catch (error) {
      toast.error("Failed to add customer.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      education: [{ degree: "", institution: "", yearOfCompletion: "" }],
      address: { street: "", city: "", state: "", postalCode: "", country: "" },
    });
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} onReset={handleReset}>
      <h2 className="text-[20px] font-semibold mb-4">Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <fieldset className="border rounded p-2 flex flex-col gap-3">
              <legend>Personal Information</legend>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </fieldset>
            <fieldset className="border rounded p-2 flex flex-col gap-3">
              <legend>Address</legend>
              <div>
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.address.street}
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.address.postalCode}
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.address.country}
                  onChange={handleAddressChange}
                />
              </div>
            </fieldset>
          </div>
          <div>
            <fieldset className="border rounded p-2 flex flex-col gap-3">
              <legend>Education Details</legend>
              <div className="overflow-hidden h-96 overflow-y-auto">
                {formData.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      name="degree"
                      placeholder="Degree"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, e)}
                      required
                    />
                    <input
                      type="text"
                      name="institution"
                      placeholder="Institution"
                      className="w-full p-2 border border-gray-300 rounded mt-2"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, e)}
                      required
                    />
                    <input
                      type="number"
                      name="yearOfCompletion"
                      placeholder="Year of Completion"
                      className="w-full p-2 border border-gray-300 rounded mt-2"
                      value={edu.yearOfCompletion}
                      onChange={(e) => handleEducationChange(index, e)}
                      required
                    />
                    <button
                      type="button"
                      className="mt-2 bg-black text-white p-1 rounded"
                      onClick={() => removeEducationField(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </fieldset>
            <button
              type="button"
              className="bg-black text-white p-2 rounded mt-4"
              onClick={addEducationField}
            >
              Add Education Field
            </button>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end">
          <button type="submit" className="bg-black text-white p-2 rounded">
            Add Customer
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCustomerModal;
