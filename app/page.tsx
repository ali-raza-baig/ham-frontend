"use client";
import { useEffect, useState, useRef } from "react";
import PowerCard from "@/components/ui/PowerCard";
import RealtimeChart from "@/components/charts/RealtimeChart";
import { io } from "socket.io-client";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [chart, setChart] = useState<any[]>([]);
  const socketRef = useRef<any>(null);

  // Setup socket + fallback polling
  useEffect(() => {
    socketRef.current = io(API!, { transports: ["websocket"] });
    socketRef.current.on("new-measurement", (msg: any) => {
      setData(msg);
      addChart(msg);
    });

    const poll = setInterval(async () => {
      const res = await axios.get(`${API}/api/data/latest`);
      if (res.data?.data) {
        setData(res.data.data);
        addChart(res.data.data);
      }
    }, 5000);

    return () => {
      socketRef.current?.disconnect();
      clearInterval(poll);
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
        <PowerCard title="Voltage" value={data?.voltage} unit="V" />
        <PowerCard title="Current" value={data?.current} unit="A" />
        <PowerCard title="Power" value={data?.power} unit="W" />
        <PowerCard title="Energy" value={data?.energy} unit="kWh" />
        <PowerCard title="Frequency" value={data?.frequency} unit="Hz" />
      </div>

      <section className="mt-8">
        <h2 className="font-medium mb-2">Live Power Chart</h2>
        <RealtimeChart data={chart} dataKey="power" />
      </section>
    </div>
  );
}
