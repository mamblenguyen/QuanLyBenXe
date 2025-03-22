import React from 'react';

interface DeletePopupProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  text: string;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ isOpen, onCancel, onConfirm, title, text }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white max-w-[410px] w-[90%] md:w-[410px] p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 text-left w-[90%] mx-auto">{text}</p>
        <div className="flex justify-center gap-4 mt-6">
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 w-[120px]" onClick={onCancel}>
            Hủy
          </button>
          <button className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 w-[120px]" onClick={onConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
