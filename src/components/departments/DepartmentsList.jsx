import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper.jsx';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa'; // Import the plus icon

const DepartmentsList = () => {
    const [departments, setDepartments] = useState([]);
    const [deptLoading, setDeptLoading] = useState(false);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const navigate = useNavigate();

    const onDeleteDepartment = async (id) => {
        await fetchDepartments();
    }

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setDeptLoading(true);
        try {
            const response = await axios.get('https://rekciana.vercel.app/api/department', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.departments.map((dep) => ({
                    _id: dep._id,
                    sno: sno++,
                    dept_name: dep.dept_name,
                    action: <DepartmentButtons _id={dep._id} onDeleteDepartment={onDeleteDepartment} />,
                }));

                setDepartments(data);
                setFilteredDepartments(data);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        } finally {
            setDeptLoading(false);
        }
    };

    const filterDepartments = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue) {
            const filtered = departments.filter((dep) =>
                dep.dept_name.toLowerCase().includes(searchValue)
            );
            setFilteredDepartments(filtered);
        } else {
            setFilteredDepartments(departments);
        }
    };

    return (
        <>
            {deptLoading ? (
                <div className="text-center text-5xl text-green-700 font-extrabold">Loading . . .</div>
            ) : (
                <div className="p-5">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold font-titillium">Manage Departments</h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            placeholder="Search By Dept Name"
                            className="px-4 py-1 rounded border"
                            onChange={filterDepartments}
                        />
                        <Link
                            to="/admin-dashboard/add-department"
                            className="flex items-center px-4 py-1 bg-emerald-500 hover:bg-emerald-700 hover:font-bold rounded text-white"
                        >
                            <span className="hidden sm:inline md:hidden">Add</span> {/* Show "Add" on medium screens */}
                            <FaPlus className="inline sm:hidden" /> {/* Show plus icon on small screens */}
                            <span className="hidden md:inline">Add Department</span> {/* Show full text on large screens */}
                        </Link>
                    </div>
                    <div className="mt-5">
                        <DataTable columns={columns} data={filteredDepartments} pagination />
                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentsList;
