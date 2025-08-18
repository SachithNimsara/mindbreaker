import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ScoreDashboard() {
  const data = [
    { day: "Mon", score: 70 },
    { day: "Tue", score: 50 },
    { day: "Wed", score: 90 },
    { day: "Thu", score: 60 },
    { day: "Fri", score: 80 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Mind-Productivity Score</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}