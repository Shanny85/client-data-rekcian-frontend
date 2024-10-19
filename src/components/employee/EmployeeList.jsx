import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import {columns, EmployeeButtons} from "../../utils/EmployeeHelper.jsx";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeLoading, setEmployeeLoading] = useState(false);
    const [filteredEmployees, setFilteredEmployees] = useState([]);


    useEffect(() => {
        fetchEmployees()
    }, []);

    const fetchEmployees = async () => {
        setEmployeeLoading(true);
        try {
            const response = await axios.get('https://client-data-rekcian-api.vercel.app/api/employee', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.employees.map((person) => ({
                    _id: person._id,
                    sno: sno++,
                    name: person.userId.name,
                    phone: person.phone,
                    lastName: person.lastName,
                    dob: new Date(person.dob).toLocaleDateString(),
                    employeeId: person.employeeId,
                    action: (<EmployeeButtons _id={person._id}/>),

                }));
                setEmployees(data);
                setFilteredEmployees(data);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        } finally {
            setEmployeeLoading(false);
        }
    };

    const filterEmployees = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue) {
            const filtered = employees.filter((emp) =>
                emp.name.toLowerCase().includes(searchValue) ||
                emp.employeeId.toLowerCase().includes(searchValue)
            );
            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees(employees);
        }
    };



    return (
        <>
            {employeeLoading ? (
                <div className="text-center text-5xl text-green-700 font-extrabold">Loading . . .</div>
            ) : (
                <div className="p-5">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold font-titillium">Manage Clients</h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            placeholder="Search By ID or Name"
                            className="px-4 py-1 rounded border"
                            onChange={filterEmployees}
                        />
                        <Link
                            to="/admin-dashboard/add-employee"
                            className="flex items-center px-4 py-1 bg-emerald-500 hover:bg-emerald-700 hover:font-bold rounded text-white"
                        >
                            <span className="hidden sm:inline md:hidden">Add</span> {/* Show "Add" on medium screens */}
                            <FaPlus className="inline sm:hidden" /> {/* Show plus icon on small screens */}
                            <span className="hidden md:inline">Add Client</span> {/* Show full text on large screens */}
                        </Link>
                    </div>
                    <div className="mt-5">
                        <DataTable
                            columns={columns}
                            data={filteredEmployees}
                            pagination
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default EmployeeList;
