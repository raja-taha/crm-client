import React, { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, onReset, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
        onReset(); // Reset form when closing the modal
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose, onReset]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div ref={modalRef} className="bg-white p-5 rounded-lg w-[60%] relative">
        <button
          className="absolute top-2 right-2 w-10"
          onClick={() => {
            onClose();
            onReset(); // Reset form when closing the modal
          }}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
