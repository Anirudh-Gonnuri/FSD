import React, { useEffect, useState } from "react";
import API from "../api";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    setLoading(true);
    const res = await API.get("/users");
    setUsers(res.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete user?")) return;
    await API.delete(`/users/${id}`);
    fetchUsers();
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-indigo-400 mb-6">
        Registered Users
      </h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-400">No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((u) => (
            <div
              key={u.id}
              className="flex items-center justify-between bg-gray-700 p-4 rounded-xl shadow"
            >
              <div className="flex items-center gap-4">
                {u.profile_picture ? (
                  <img
                    src={`http://localhost:5000/${u.profile_picture}`}
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-400"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 text-sm">
                    N/A
                  </div>
                )}
                <div>
                  <div className="font-semibold text-white">{u.name}</div>
                  <div className="text-sm text-gray-300">
                    {u.email} • {u.phone}
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
