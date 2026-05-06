import { useState, useEffect } from "react";
import api from "../../services/api";
import "./AdminUserManager.css";

function AdminUserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editData, setEditData] = useState({});

  const token = localStorage.getItem("token");

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.users);
      setError("");
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditData({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  };

  const handleSaveEdit = async (userId) => {
    try {
      await api.put(
        `/admin/users/${userId}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("✅ User updated successfully!");
      fetchUsers();
      setEditingUserId(null);
    } catch (err) {
      setError("Failed to update user");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess("✅ User deleted successfully!");
        fetchUsers();
      } catch (err) {
        setError("Failed to delete user");
      }
    }
  };

  return (
    <div className="user-manager">
      <div className="user-header">
        <h2>👥 User Management</h2>
        <button onClick={fetchUsers} className="btn-refresh">
          🔄 Refresh
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="users-container">
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p className="no-data">No users found</p>
        ) : (
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className={editingUserId === user._id ? "editing" : ""}>
                    <td>
                      {editingUserId === user._id ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td>
                      {editingUserId === user._id ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editingUserId === user._id ? (
                        <select
                          value={editData.isAdmin}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              isAdmin: e.target.value === "true"
                            })
                          }
                        >
                          <option value="false">User</option>
                          <option value="true">Admin</option>
                        </select>
                      ) : (
                        <span
                          className={`role-badge ${
                            user.isAdmin ? "admin" : "user"
                          }`}
                        >
                          {user.isAdmin ? "👑 Admin" : "👤 User"}
                        </span>
                      )}
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        {editingUserId === user._id ? (
                          <>
                            <button
                              className="btn-save"
                              onClick={() => handleSaveEdit(user._id)}
                            >
                              ✓ Save
                            </button>
                            <button
                              className="btn-cancel"
                              onClick={() => setEditingUserId(null)}
                            >
                              ✕ Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn-edit"
                              onClick={() => handleEditClick(user)}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              🗑️ Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Stats Summary */}
      {users.length > 0 && (
        <div className="user-stats">
          <div className="stat">
            <h4>Total Users</h4>
            <p className="stat-number">{users.length}</p>
          </div>
          <div className="stat">
            <h4>Admin Users</h4>
            <p className="stat-number">{users.filter((u) => u.isAdmin).length}</p>
          </div>
          <div className="stat">
            <h4>Regular Users</h4>
            <p className="stat-number">{users.filter((u) => !u.isAdmin).length}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUserManager;
