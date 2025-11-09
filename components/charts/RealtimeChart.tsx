import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RealtimeChart({ data, dataKey }: { data: any[]; dataKey: string }) {
  return (
    <div className="bg-muted/10 rounded-xl p-3">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke="#0ea5e9" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
