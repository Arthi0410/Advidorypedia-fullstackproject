import React, { useState } from 'react';
import axios from 'axios';
import './signup.css'

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAndConditions: false,
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const errors = {};
        if (!formData.username.trim()) errors.username = 'Username is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        if (!formData.password.trim()) errors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        if (!formData.termsAndConditions) errors.termsAndConditions = 'Please accept terms and conditions';

        setErrors(errors);
        if (Object.keys(errors).length > 0) return;

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/auth/signup', formData);
            console.log(response.data.message)
            setSuccessMessage(response.data.message);
            setLoading(false);
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                termsAndConditions: false,
            });
            window.location.replace(`/posts`);
        } catch (error) {
            setErrors({ serverError: error.response.data.message });
            console.log("error:", error.message)
            setLoading(false);
        }
    };

    return (
        <div className='modal'>

            <div className='container'>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {errors.serverError && <p className="err text-red-500">{errors.serverError}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="hd text-base font-semibold leading-7 text-gray-900">Sign Up</h2>
                    <div className='form-grp flex-col gap-4 '>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="block flex-1 border-0 bg-transparent mx-6 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                        {errors.username && <p className="err text-red-500">{errors.username}</p>}
                    </div>
                    <div className='form-grp'>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        {errors.email && <p className="err text-red-500">{errors.email}</p>}
                    </div>
                    <div className='form-grp'>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        {errors.password && <p className="err text-red-500">{errors.password}</p>}
                    </div>
                    <div className='form-grp'>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        {errors.confirmPassword && <p className="err text-red-500">{errors.confirmPassword}</p>}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="termsAndConditions"
                            checked={formData.termsAndConditions}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label htmlFor="termsAndConditions" className="terms text-gray-700">I agree to the terms and conditions</label>
                    </div>
                    {errors.termsAndConditions && <p className="err text-red-500">{errors.termsAndConditions}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`cb bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Sign Up
                    </button>
                    {loading && <p>Loading...</p>}
                </form>
            </div>
        </div>
    );
};

export default SignUp;

