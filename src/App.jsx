import React, { useState } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';
import "./App.css";


export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const activeTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="app-container margin-auto">
  <div className="todo-wrapper">
    <div className="header">
      <h1>Todo App</h1>
      <p>Stay organized and productive</p>
    </div>

    <div className="card">
      <div className="input-row">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="What needs to be done?"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.length > 0 && (
        <div className="counter">{activeTasks} tasks remaining</div>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task ${task.completed ? "completed" : ""}`}
        >
          <span
            className={task.completed ? "completed-text" : ""}
            onClick={() => toggleTask(task.id)}
          >
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)}>✕</button>
        </div>
      ))}

      {tasks.some(task => task.completed) && (
        <button
          className="clear-btn"
          onClick={() => setTasks(tasks.filter(t => !t.completed))}
        >
          Clear completed tasks
        </button>
      )}
    </div>

    <div className="footer">
      Click on tasks to mark them complete
    </div>
  </div>
</div>
);
}