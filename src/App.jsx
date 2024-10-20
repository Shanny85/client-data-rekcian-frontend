import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee.jsx";
import ViewEmployee from "./components/employee/ViewEmployee.jsx";
import EditEmployee from "./components/employee/EditEmployee.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Redirect root to admin-dashboard */}
                    <Route path="/" element={<Navigate to="/admin-dashboard" />} />

                    {/* Login Route */}
                    <Route path="/login" element={<Login />} />

                    {/* Admin Dashboard Route with nested routes */}
                    <Route
                        path="/admin-dashboard"
                        element={
                            <PrivateRoutes>
                                <RoleBasedRoutes requiredRoles={["admin"]}>
                                    <AdminDashboard />
                                </RoleBasedRoutes>
                            </PrivateRoutes>
                        }
                    >
                        {/* Nested routes within Admin Dashboard */}
                        <Route index element={<AdminSummary />} />
                        <Route path="employee" element={<EmployeeList />} />
                        <Route path="add-employee" element={<AddEmployee />} />
                        <Route path="employee/:id" element={<ViewEmployee/>} />
                        <Route path="employee/edit/:id" element={<EditEmployee/>} />

                    </Route>

                    {/* Employee Dashboard Route */}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
