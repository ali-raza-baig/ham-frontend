"use client";
import { useEffect, useState } from "react";
import PowerCard from "@/components/ui/PowerCard";
import RealtimeChart from "@/components/charts/RealtimeChart";

import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]); // store all data
  const [chart, setChart] = useState<any[]>([]);
  const [recent, setRecent] = useState<any>({});
  const [last30DaysUsage, setLast30DaysUsage] = useState<number>(0);
  const [last24HoursUsage, setLast24HoursUsage] = useState<number>(0);

  // Fetch recent data and all data
  useEffect(() => {
    // Fetch the most recent measurement every 1s
    const recentInterval = setInterval(async () => {
      try {
        const res = await axios.get(`${API}/api/data/last-one`);
        if (res.data?.data) {
          setRecent(res.data.data);
          addChart(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching recent data:", err);
      }
    }, 3000);

    // Fetch all data for last 30 days / 24 hours every 10s
    const pollInterval = setInterval(async () => {
      try {
        const res = await axios.get(`${API}/api/data/latest`);
        const allData = res.data?.data || res.data || [];
        setData(allData);

      } catch (err) {
        console.error("Error fetching all data:", err);
      }
    }, 1000);

    const usage = setInterval(async () => {
      try {
        const res = await axios.get(`${API}/api/data/usage`);
        setLast24HoursUsage(res.data.last24hUsage);
        setLast30DaysUsage(res.data.last30dUsage);
        
      } catch (error) {
        console.log(`Error in fetching usage : ${error}`)
      }
    }, 3000);
    return () => {
      clearInterval(recentInterval);
      clearInterval(pollInterval);
      clearInterval(usage)
    };
  }, []);

  const addChart = (item: any) => {
    const t = new Date(item.timestamp).toLocaleTimeString();
    setChart((prev) => {
      const next = [...prev, { time: t, power: item.power }];
      if (next.length > 100) next.shift();
      return next;
    });
  };

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-5">
        <PowerCard title="Voltage" value={recent?.voltage} unit="V" />
        <PowerCard title="Current" value={recent?.current} unit="A" />
        <PowerCard title="Power" value={recent?.power} unit="W" />
        <PowerCard title="Energy" value={recent?.lastEnergy} unit="kWh" />
        <PowerCard title="Frequency" value={recent?.frequency} unit="Hz" />
      </div>

      <div className="grid gap-4 pt-4 grid-cols-2">
        <PowerCard
          title="Last 30 Days Usage"
          value={Number((last30DaysUsage ?? 0))}
          unit="kWh"
        />
        <PowerCard
          title="Last 24 Hours Usage"
          value={Number((last24HoursUsage ?? 0))}
          unit="kWh"
        />

      </div>

      <section className="mt-8">
        <h2 className="font-medium mb-2">Live Power Chart</h2>
        <RealtimeChart data={chart} dataKey="power" />
      </section>
    </div>
  );
}
