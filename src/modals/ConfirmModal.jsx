import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded shadow-lg p-5 max-w-lg w-full">
                <h2 className="text-lg font-semibold">Are you sure you want to delete this ?</h2>
                <div className="flex justify-end mt-4">
                    <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded mr-2" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-800 text-white rounded" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
