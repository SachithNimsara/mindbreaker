import React, { useState, useEffect } from "react";

export default function BreakTimer() {
  const [seconds, setSeconds] = useState(1500); // 25 min default
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const reset = () => setSeconds(1500);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Mindful Break Timer</h2>
      <p className="text-2xl">{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, "0")}</p>
      <div className="flex gap-2 mt-3">
        <button onClick={() => setIsActive(!isActive)} className="bg-green-500 text-white px-3 rounded">
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={reset} className="bg-red-500 text-white px-3 rounded">
          Reset
        </button>
      </div>
    </div>
  );
}