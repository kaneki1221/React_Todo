import React, { useState } from 'react';
import './TodoList.css';

export default function TodoList() {
    const [tasks, setTasks] = useState([
        { text: "Eat breakfast", completed: false },
        { text: "Drink plenty of water", completed: false }
    ]);
    const [newTask, setNewTask] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    function handleInputChange(e) {
        setNewTask(e.target.value);
    }

    function addTask() {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask("");
        } else {
            alert("Please enter a task.");
        }
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function toggleTaskCompletion(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }

    function toggleDarkMode() {
        setDarkMode(!darkMode);
    }

    return (
        <div className={`todo-container ${darkMode ? 'dark-mode' : ''}`}>
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <h1>Todo List</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter new task"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-btn" onClick={addTask}>Add Task</button>
            </div>
            <ol className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className={task.completed ? "completed-task" : ""}>
                        <span className="task-text" onClick={() => toggleTaskCompletion(index)}>
                            {task.text}
                        </span>
                        <div className="button-group">
                            <button className="move-up-btn" onClick={() => moveTaskUp(index)} aria-label="Move task up">Move Up</button>
                            <button className="move-down-btn" onClick={() => moveTaskDown(index)} aria-label="Move task down">Move Down</button>
                            <button className="delete-btn" onClick={() => deleteTask(index)} aria-label="Delete task">Delete</button>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
