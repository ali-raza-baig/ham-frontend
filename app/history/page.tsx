"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function HistoryPage() {
  const [allData, setAllData] = useState<any[]>([]); // all data from backend
  const [filteredData, setFilteredData] = useState<any[]>([]); // filtered & paginated
  const [page, setPage] = useState(1);
  const [limit] = useState(20); // rows per page
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [page, allData]);

  const load = async () => {
    try {
      const res = await axios.get(`${API}/api/data/latest`);
      setAllData(res.data.data || []);
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };

  const applyFilter = () => {
    let tempData = [...allData];

    // filter by date range if selected
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      tempData = tempData.filter((d) => {
        const ts = new Date(d.timestamp);
        return ts >= start && ts <= end;
      });
    }

    // pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    setFilteredData(tempData.slice(startIndex, endIndex));
  };

  const handleFilter = () => {
    setPage(1);
    applyFilter();
  };

  const totalPages = Math.ceil(
    (startDate && endDate
      ? allData.filter((d) => {
        const ts = new Date(d.timestamp);
        return ts >= new Date(startDate) && ts <= new Date(endDate);
      }).length
      : allData.length) / limit
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-2xl font-semibold">History Logs</h1>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-36 border-2 rounded-2xl p-1"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-36 border-2 rounded-2xl p-1"
          />
          <Button onClick={handleFilter}>Filter</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-muted text-gray-700">
            <tr>
              <th className="px-3 py-2 text-left">Time</th>
              <th className="px-3 py-2 text-right">V</th>
              <th className="px-3 py-2 text-right">A</th>
              <th className="px-3 py-2 text-right">W</th>
              <th className="px-3 py-2 text-right">kWh</th>
              <th className="px-3 py-2 text-right">Hz</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((r) => (
                <tr key={r._id} className="border-t hover:bg-muted/10 transition">
                  <td className="px-3 py-2 whitespace-nowrap">
                    {new Date(r.timestamp).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right">{r.voltage?.toFixed(1) ?? "--"}</td>
                  <td className="px-3 py-2 text-right">{r.current?.toFixed(2) ?? "--"}</td>
                  <td className="px-3 py-2 text-right">{r.power?.toFixed(1) ?? "--"}</td>
                  <td className="px-3 py-2 text-right">{r.energy?.toFixed(2) ?? "--"}</td>
                  <td className="px-3 py-2 text-right">{r.frequency?.toFixed(1) ?? "--"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No data found for selected range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-3">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </Button>
        <span className="px-2 py-1 font-medium">
          {page} / {totalPages || 1}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
