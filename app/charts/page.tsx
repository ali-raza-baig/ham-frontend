"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function MonthlyChartPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      // Fetch all data
      const res = await axios.get(`${API}/api/data/latest`);
      const allData = res.data.data || res.data || [];

      // Group data by month (Month name + Year)
      const grouped: Record<string, { power: number; energy: number; count: number }> = {};

      allData.forEach((d: any) => {
        const dateObj = new Date(d.timestamp);
        const monthKey = dateObj.toLocaleDateString(undefined, { month: "short", year: "numeric" }); // e.g., "Nov 2025"

        if (!grouped[monthKey]) grouped[monthKey] = { power: 0, energy: 0, count: 0 };
        grouped[monthKey].power += d.power || 0;
        grouped[monthKey].energy += d.energy || 0;
        grouped[monthKey].count += 1;
      });

      // Convert grouped data to array for chart
      const chartData = Object.entries(grouped).map(([month, values]) => ({
        month,
        power: values.count ? +(values.power / values.count).toFixed(2) : 0,
        energy: values.count ? +(values.energy / values.count).toFixed(2) : 0,
      }));

      // Sort by date ascending
      chartData.sort(
        (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
      );

      setData(chartData);
    } catch (err) {
      console.error("Error loading monthly chart data:", err);
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-4">Monthly Power / Energy Trends</h1>
      <div className="bg-muted/10 p-4 rounded-xl">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            {/* <Line type="monotone" dataKey="power" stroke="#0ea5e9" name="Power (W)" /> */}
            <Line type="monotone" dataKey="energy" stroke="#22c55e" name="Energy (kWh)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
