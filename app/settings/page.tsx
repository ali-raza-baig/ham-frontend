"use client";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({ device: "", api: "", rate: 5 });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("settings") || "{}");
    setForm({ device: saved.device || "", api: saved.api || "", rate: saved.rate || 5 });
  }, []);

  const save = () => {
    localStorage.setItem("settings", JSON.stringify(form));
    alert("Settings saved!");
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <label className="block mb-2">Device ID</label>
      <input
        className="w-full border rounded p-2 mb-3"
        value={form.device}
        onChange={(e) => setForm({ ...form, device: e.target.value })}
      />
      <label className="block mb-2">Backend API URL</label>
      <input
        className="w-full border rounded p-2 mb-3"
        value={form.api}
        onChange={(e) => setForm({ ...form, api: e.target.value })}
      />
      <label className="block mb-2">Refresh Rate (sec)</label>
      <input
        type="number"
        className="w-full border rounded p-2 mb-3"
        value={form.rate}
        onChange={(e) => setForm({ ...form, rate: +e.target.value })}
      />
      <button onClick={save} className="px-4 py-2 bg-primary text-white rounded">
        Save Settings
      </button>
    </div>
  );
}
