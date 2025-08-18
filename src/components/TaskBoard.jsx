import React, { useState } from "react";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { text: newTask, done: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Task Manager</h2>
      <div className="flex gap-2">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task"
          className="border p-2 rounded w-full"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-3 rounded">
          Add
        </button>
      </div>
      <ul className="mt-3">
        {tasks.map((t, i) => (
          <li
            key={i}
            className={`p-2 border-b flex justify-between ${t.done ? "line-through text-gray-500" : ""}`}
          >
            {t.text}
            <button onClick={() => toggleTask(i)} className="text-sm text-blue-600">
              {t.done ? "Undo" : "Done"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}