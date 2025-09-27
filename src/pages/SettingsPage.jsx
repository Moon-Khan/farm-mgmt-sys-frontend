import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, updateMe, logout } from "../services/authService";
import { User, Mail, Shield, Save, LogOut } from "lucide-react";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getMe();
        const u = res?.data || {};
        setForm({ name: u.name || "", email: u.email || "", password: "" });
      } catch (e) {
        setError(e?.message || "Failed to load profile");
        // If unauthorized, clear token and redirect to login page
        localStorage.removeItem("auth_token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const payload = { name: form.name };
      if (form.password) payload.password = form.password;
      await updateMe(payload);
      setSuccess("Profile updated successfully");
      setForm((f) => ({ ...f, password: "" }));
    } catch (e) {
      setError(e?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcf7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account and preferences</p>
      </div>

      <div className="p-4 space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">{error}</div>
        )}
        {success && (
          <div className="p-3 rounded-lg bg-green-50 text-green-700 border border-green-200">{success}</div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-green-600" />
            <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
          </div>

          <form className="space-y-4" onSubmit={onSave}>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
                <User size={16} className="text-gray-500" />
                <input
                  className="flex-1 outline-none"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                <Mail size={16} className="text-gray-500" />
                <input
                  className="flex-1 outline-none bg-gray-50"
                  name="email"
                  value={form.email}
                  disabled
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">New Password</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                placeholder="Leave blank to keep current password"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom spacer for mobile navigation */}
      <div className="h-20" />
    </div>
  );
};

export default SettingsPage;
