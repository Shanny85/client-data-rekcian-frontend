import React, { useState } from 'react';
import axios from "axios";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                "https://rekciana.vercel.app/api/auth/login",
                { email, password }
            );

            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);

                // Redirect based on user role
                const redirectPath = response.data.user.role === "admin"
                    ? "/admin-dashboard"
                    : "/employee-dashboard";
                navigate(redirectPath);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || "An error occurred";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-emerald-700 from-50% to-gray-800 to-50% space-y-8">
            <h2 className="font-libre text-4xl font-bold text-lime-400 drop-shadow-md">
                Client Management System
            </h2>
            <div className="shadow rounded-md p-6 w-80 bg-green-900">
                <h2 className=" text-lime-400 text-center text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lime-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 bg-lime-100 rounded"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-lime-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 bg-lime-100 rounded"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                className="form-checkbox accent-emerald-600"
                            />
                            <span className="ml-2 text-gray-400">Remember me</span>
                        </label>
                        <a href="#" className="text-teal-500">Forgot password?</a>
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className={`w-full bg-teal-500 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
