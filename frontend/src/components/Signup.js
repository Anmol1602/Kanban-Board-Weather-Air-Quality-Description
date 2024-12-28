import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage({ setUser }) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                alert('User registered and logged in successfully!');
                setFormData({ name: '', email: '', password: '' });
                navigate('/kanban');
            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while signing up. Please try again later.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50">
            <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
                <h1 className="text-2xl font-bold text-blue-700 mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className="label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="input"
                        required
                    />
                    <label htmlFor="email" className="label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="input"
                        required
                    />
                    <label htmlFor="password" className="label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="input"
                        required
                    />
                    <button type="submit" className="button w-full">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;
