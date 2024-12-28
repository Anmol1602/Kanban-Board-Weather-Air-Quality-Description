import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function PricingPage({ user, setUser }) {
    const [selectedSubscription, setSelectedSubscription] = useState('free');
    const [otp, setOtp] = useState('');
    const [status, setStatus] = useState('');
    const [otpSent, setOtpSent] = useState(false); // Track OTP sent state
    const [isSubscribedForYear, setIsSubscribedForYear] = useState(false); // Check if user is already subscribed
    const [hovered, setHovered] = useState(null); // Track which subscription plan is being hovered over
    const navigate = useNavigate(); // Initialize navigate

    // Fetch user data (subscription status) on component mount
    useEffect(() => {
        if (user && user.email) { // Check if user exists and has email
            const fetchUserProfile = async () => {
                try {
                    const response = await fetch(`http://localhost:5001/user-profile?email=${user.email}`);
                    if (response.ok) {
                        const data = await response.json();
                        // Check if user is already subscribed for 1 year
                        setIsSubscribedForYear(data.subscription === 'year');
                    } else {
                        setStatus('Error fetching user profile');
                    }
                } catch (error) {
                    setStatus('Error fetching user profile');
                }
            };
    
            fetchUserProfile();
        }
    }, [user]); // Runs only when the user object changes
    

    const handleSubscriptionSelect = (subscription) => {
        setSelectedSubscription(subscription);
        setOtpSent(false); // Reset OTP sent state when switching plans
        setStatus(''); // Clear any existing status messages
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSendOtp = async () => {
        // Check if the user already has a 1-Year subscription
        if (isSubscribedForYear) {
            setStatus("You already have a 1-Year subscription.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    subscription: selectedSubscription
                }),
            });

            if (response.ok) {
                setOtpSent(true);
                setStatus('OTP sent successfully. Check your email.');
            } else {
                const errorMessage = await response.text();
                setStatus(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setStatus('Error while sending OTP');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate OTP
        if (!otp) {
            setStatus("Please enter the OTP");
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/validate-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email, // User email
                    otp,
                    subscription: selectedSubscription
                }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser); // Update user with new subscription data
                setStatus('Subscription updated successfully!');

                // Redirect to UserProfile page
                navigate('/profile');
            } else {
                const errorMessage = await response.text();
                setStatus(`Error: ${errorMessage}`);
            }
        } catch (error) {
            setStatus('Error while updating subscription');
        }
    };

    return (
        <div className="pricing-page bg-gray-50 min-h-screen p-6">
            <h1 className="text-3xl font-semibold text-center text-blue-700 mb-8">Choose Your Subscription</h1>
            <div className="flex justify-center gap-6 mb-6">
                <div
                    className={`pricing-option cursor-pointer p-6 w-full max-w-xs bg-white rounded-lg shadow-lg hover:bg-blue-100 transition ${
                        selectedSubscription === 'free' ? 'border-2 border-blue-500' : ''
                    }`}
                    onClick={() => handleSubscriptionSelect('free')}
                    onMouseEnter={() => setHovered('free')}
                    onMouseLeave={() => setHovered(null)}
                >
                    <h2 className="text-2xl font-semibold text-center text-blue-600">Free</h2>
                    <p className="text-center text-gray-700">1-Day Chatbot Access</p>
                    {hovered === 'free' && !user && (
                        <div className="hover-message text-center text-sm text-gray-500 mt-2">Please log in or sign up to choose a plan</div>
                    )}
                </div>
                <div
                    className={`pricing-option cursor-pointer p-6 w-full max-w-xs bg-white rounded-lg shadow-lg hover:bg-blue-100 transition ${
                        selectedSubscription === 'year' ? 'border-2 border-blue-500' : ''
                    }`}
                    onClick={() => handleSubscriptionSelect('year')}
                    onMouseEnter={() => setHovered('year')}
                    onMouseLeave={() => setHovered(null)}
                >
                    <h2 className="text-2xl font-semibold text-center text-blue-600">1-Year</h2>
                    <p className="text-center text-gray-700">Full Access for 1 Year</p>
                    {hovered === 'year' && !user && (
                        <div className="hover-message text-center text-sm text-gray-500 mt-2">Please log in or sign up to choose a plan</div>
                    )}
                </div>
            </div>

            {/* Show Send OTP button only for the 1-Year plan and if the user is logged in */}
            {selectedSubscription === 'year' && !isSubscribedForYear && user && (
                <button
                    onClick={handleSendOtp}
                    disabled={otpSent} // Disable if OTP already sent
                    className="w-full max-w-xs py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
                >
                    {otpSent ? "OTP Sent" : "Send OTP"}
                </button>
            )}

            {/* Show OTP input form only if OTP is sent */}
            {otpSent && (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <label htmlFor="otp" className="block text-gray-700">Enter OTP:</label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="Enter OTP"
                        required
                        className="w-full max-w-xs p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full max-w-xs py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                    >
                        Confirm Subscription
                    </button>
                </form>
            )}

            {/* Display status messages */}
            {status && <p className="mt-4 text-center text-red-500">{status}</p>}
        </div>
    );
}

export default PricingPage;
