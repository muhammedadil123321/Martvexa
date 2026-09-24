import { useState, useEffect } from 'react';
import { fetchSettings, updateSettings, changePasswordApi } from '../../services/api';

export default function Settings() {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [messageTemplate, setMessageTemplate] = useState('');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await fetchSettings();
      setWhatsappNumber(data.whatsappNumber || '918891900699');
      setMessageTemplate(
        data.messageTemplate ||
          'Hi Martvexa,\n\nI want to order this item:\n🛍️ *{product_name}*\n💵 Total Amount: *₹{price}*\n\nPlease confirm my order.'
      );
    } catch (err) {
      setMessage({ type: 'error', text: 'Error loading settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token'); // നിങ്ങളുടെ Auth Token
      await updateSettings({ whatsappNumber, messageTemplate }, token);
      setMessage({ type: 'success', text: 'Settings updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setMessage({ type: 'error', text: 'Please fill both password fields' });
      return;
    }

    setChangingPassword(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      await changePasswordApi({ currentPassword, newPassword }, token);
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to change password' });
    } finally {
      setChangingPassword(false);
    }
  };

  const insertPlaceholder = (tag) => {
    setMessageTemplate((prev) => prev + ` ${tag}`);
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">Loading settings...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-sm rounded-xl my-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Store Settings</h1>

      {message.text && (
        <div
          className={`p-4 rounded-lg mb-6 text-sm font-medium ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* WhatsApp & General Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            WhatsApp Order Number (With Country Code)
          </label>
          <input
            type="text"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="e.g. 918891900699"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A9812F] outline-none"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            നമ്പർ നൽകുമ്പോൾ country code സഹിതം നൽകുക (e.g., 918891900699).
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            WhatsApp Order Message Template
          </label>
          <textarea
            rows="5"
            value={messageTemplate}
            onChange={(e) => setMessageTemplate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A9812F] outline-none font-mono text-sm"
            required
          />

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-xs font-medium text-gray-600">Insert Placeholders:</span>
            <button
              type="button"
              onClick={() => insertPlaceholder('{product_name}')}
              className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs text-gray-700 font-mono"
            >
              &#123;product_name&#125;
            </button>
            <button
              type="button"
              onClick={() => insertPlaceholder('{price}')}
              className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs text-gray-700 font-mono"
            >
              &#123;price&#125;
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-[#A9812F] hover:bg-[#8e6b26] disabled:opacity-75 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow transition-colors"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>

      <hr className="my-10 border-gray-200" />

      {/* Change Password Section */}
      <div className="pt-2">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A9812F] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A9812F] outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={changingPassword}
            className="px-6 py-2.5 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-600 text-white font-semibold rounded-lg shadow transition-colors"
          >
            {changingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}