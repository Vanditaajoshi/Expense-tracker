import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Settings: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("Male");

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile") || "{}");
    if (savedProfile) {
      setName(savedProfile.name || "");
      setEmail(savedProfile.email || "");
      setBirthday(savedProfile.birthday || "");
      setGender(savedProfile.gender || "Male");
    }
  }, []);

  const handleUpdateProfile = () => {
    const updatedProfile = { name, email, birthday, gender };
    localStorage.setItem("profile", JSON.stringify(updatedProfile));
    toast.success("Profile Updated Successfully ✅");
  };

  return (
    <div className="poppins w-full h-screen flex justify-center items-center bg-gray-100 text-black">
      <div className="w-[39%] bg-white shadow-lg rounded-2xl p-10 max-lg:w-[97%]">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-5">Profile Settings</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full focus:outline-none"
              placeholder="Name"
            />
          </label>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full focus:outline-none"
              placeholder="Email"
            />
          </label>
        </div>

        {/* Birthday Input */}
        <div className="mb-4">
          <label className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full focus:outline-none"
            />
          </label>
        </div>

        {/* Gender Selection */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Settings;
