import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export default function SuccessModal({
  isOpen,
  message,
  onClose,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-center text-lg font-medium">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-black text-white py-2 rounded-lg"
        >
          확인
        </button>
      </div>
    </div>
  );
}
