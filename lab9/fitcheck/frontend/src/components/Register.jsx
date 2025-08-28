import React, { useState } from "react";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    profile_picture: null,
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "profile_picture") {
      setForm({ ...form, profile_picture: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("phone", form.phone);
    if (form.profile_picture) {
      data.append("profile_picture", form.profile_picture);
    }

    try {
      await API.post("/users/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Registration successful! Check your email.");
      setForm({ name: "", email: "", phone: "", profile_picture: null });
    } catch (err) {
      console.error(err);
      setMessage("❌ Registration failed.");
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-indigo-400 mb-6">Register</h2>
      {message && (
        <p className="mb-4 text-sm text-green-400 font-medium">{message}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-gray-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
