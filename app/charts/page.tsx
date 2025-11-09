"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ChartsPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await axios.get(`${API}/api/data/history?limit=200`);
    const arr = res.data.data.map((d: any) => ({
      time: new Date(d.timestamp).toLocaleTimeString(),
      power: d.power,
      energy: d.energy,
    }));
    setData(arr.reverse());
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Power / Energy Trends</h1>
      <div className="bg-muted/10 p-4 rounded-xl">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="power" stroke="#0ea5e9" />
            <Line type="monotone" dataKey="energy" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
