import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import ConfirmModal from '../modals/ConfirmModal.jsx';
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import {urlHelper} from "./UrlHelper.jsx";

export const columns = [
    {
        name: "Serial Number",
        id: "snum",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        id: "departmentName",
        selector: (row) => row.dept_name,
        sortable: true
    },
    {
        name: "Action",
        id: "departmentAction",
        selector: (row) => row.action,
        center: "true"
    }
];

export const DepartmentButtons = ({ _id, onDeleteDepartment }) => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [departmentIdToDelete, setDepartmentIdToDelete] = useState(null);

    const handleDelete = async (id) => {
        setDepartmentIdToDelete(id);
        setModalOpen(true);
    };

    const confirmDelete = async () => {
        if (departmentIdToDelete) {
            try {
                const response = await axios.delete(
                    `${urlHelper}/api/department/${departmentIdToDelete}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                if (response.data.success) {
                    onDeleteDepartment(departmentIdToDelete);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
            setModalOpen(false);
        }
    };

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >
                <span className="hidden md:inline">Edit</span>
                <FaPencilAlt className="md:hidden" />
            </button>
            <button
                className="px-3 py-1 bg-red-600 hover:bg-red-800 text-white rounded flex items-center"
                onClick={() => handleDelete(_id)}
            >
                <span className="hidden md:inline">Delete</span>
                <FaTrashAlt className="md:hidden" />
            </button>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};
