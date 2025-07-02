import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../layout/Header";
import { fetchAllUsers } from "../store/slice/userSlice";

const Users = () => {
  const dispatch = useDispatch();

  const { users = [], loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="p-6 pt-28 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">📋 Registered Users</h2>

          {/* Loading */}
          {loading && (
            <p className="text-gray-600 text-lg">Loading users...</p>
          )}

          {/* Error */}
          {error && (
            <p className="text-red-600 text-lg font-medium">Error: {error}</p>
          )}

          {/* No Users */}
          {!loading && !error && users.length === 0 && (
            <p className="text-lg text-gray-800">
              No registered users found in the library.
            </p>
          )}

          {/* User List */}
          {!loading && !error && users.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {users.map((user, index) => (
                <div
                  key={user._id || index}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-700 mb-1">{user.email}</p>
                  <p className="text-sm text-gray-500">Role: {user.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Users;
