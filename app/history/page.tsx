"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function HistoryPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => { load(); }, [page]);

  async function load() {
    const res = await axios.get(`${API}/api/data/history?page=${page}&limit=20`);
    setRows(res.data.data || []);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">History Logs</h1>
      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-3 py-2 text-left">Time</th>
              <th className="px-3 py-2">V</th>
              <th className="px-3 py-2">A</th>
              <th className="px-3 py-2">W</th>
              <th className="px-3 py-2">kWh</th>
              <th className="px-3 py-2">Hz</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id} className="border-t hover:bg-muted/10">
                <td className="px-3 py-2">{new Date(r.timestamp).toLocaleString()}</td>
                <td className="px-3 py-2">{r.voltage}</td>
                <td className="px-3 py-2">{r.current}</td>
                <td className="px-3 py-2">{r.power}</td>
                <td className="px-3 py-2">{r.energy}</td>
                <td className="px-3 py-2">{r.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 gap-3">
        <button onClick={() => setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded">Prev</button>
        <span>{page}</span>
        <button onClick={() => setPage(p=>p+1)} className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  );
}
