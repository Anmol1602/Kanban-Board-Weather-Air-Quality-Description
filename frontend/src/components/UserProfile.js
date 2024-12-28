import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile({ user, setUser }) {
  const [profile, setProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      // Check if user exists and has email
      fetch(`http://localhost:5001/user-profile?email=${user.email}`)
        .then((response) => response.json())
        .then((data) => setProfile(data))
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [user]);

  const handleChange = (e) => {
    setUpdatedProfile({
      ...updatedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    fetch("http://localhost:5001/user-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, ...updatedProfile }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        alert("Profile updated successfully!");
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
    alert("Logged out successfully!");
  };

  if (!user) {
    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Profile
        </h2>
        {profile ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={updatedProfile.name || profile.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={updatedProfile.phone || profile.phone || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={updatedProfile.address || profile.address || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subscription:
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  name="subscription"
                  value={
                    profile?.subscription === "year"
                      ? "1-Year Subscription"
                      : "Free (1-Day)"
                  }
                  disabled
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subscription Expiry:
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  name="subscriptionExpiry"
                  value={
                    profile.subscriptionExpiry
                      ? new Date(
                          profile.subscriptionExpiry
                        ).toLocaleDateString()
                      : "N/A"
                  }
                  disabled
                />
              </label>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
