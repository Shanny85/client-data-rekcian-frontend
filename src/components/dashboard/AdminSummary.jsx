import React, { useEffect, useState } from 'react';
import SummaryCard from "./SummaryCard.jsx";
import { FaUsers } from "react-icons/fa";
import axios from 'axios';

const AdminSummary = () => {
    const [employees, setEmployees] = useState([]); // State to hold all employees
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const itemsPerPage = 10; // Number of items to display per page

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employee', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.data.success) {
                    setEmployees(response.data.employees); // Set the full list of employees
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    // Calculate the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="p-6 space-y-12">
            <h3 className="text-2xl font-bold font-titillium">Dashboard Overview</h3>
            <div className="w-full">
                {loading ? (
                    <div className="text-center">Loading...</div> // Show loading text while fetching data
                ) : (
                    <>
                        <SummaryCard
                            icon={<FaUsers />}
                            text="Total Clients For Date"
                            employees={currentItems} // Pass only the current page items
                            color="bg-emerald-700"
                        />
                        {/* Pagination Controls */}
                        <div className="flex justify-center space-x-2 mt-4">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminSummary;
