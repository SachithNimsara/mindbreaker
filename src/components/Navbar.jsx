import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-3 flex gap-4">
      <Link to="/tasks">Tasks</Link>
      <Link to="/journal">Journal</Link>
      <Link to="/breaks">Breaks</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}