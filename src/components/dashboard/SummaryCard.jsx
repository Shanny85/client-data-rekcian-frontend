import React from 'react';

// Group employees by their creation date
const groupByDate = (employees) => {
    return employees.reduce((acc, employee) => {
        const date = new Date(employee.createdAt).toDateString(); // Adjust format as needed
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(employee);
        return acc;
    }, {});
};

const SummaryCard = ({ icon, text, color, employees }) => {
    const groupedEmployees = groupByDate(employees);

    return (
        <div className="flex flex-col">
            {Object.entries(groupedEmployees).map(([date, employeeList]) => (
                <div key={date} className="mb-4">
                    <div className="rounded flex bg-white">
                        <div className={`text-3xl flex justify-center items-center ${color} text-white font-bold px-4 rounded-l`}>
                            {icon}
                        </div>
                        <div className="pl-4 py-1">
                            <p className="text-lg font-semibold">{text} - {date}</p>
                            <p className="text-xl font-bold">{employeeList.length} Clients</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCard;
