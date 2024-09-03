import { useEffect, useState } from "react";
import { AddTask } from "./AddTask";
import { Stats } from "./Stats";
import { TaskList } from "./TaskList";
import axios from "axios";

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState({})
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
  const handleDelete = (id) => {
    setTasks(tasks.filter((task => task.id != id)));
  };
  const handleChange = (id, newStatus) => {
    setTasks(tasks.map((task) => {
      return task.id == id ? { ...task, 'status': newStatus } : task
    }))
  }
  useEffect(() => {
    axios.get("http://localhost:3004/tasks").then((responce) => {
      setTasks(responce.data);
    });
  }, []);
  
  useEffect(() => {
    updateStats();
  }, [tasks]);

  const updateStats = () => {
    let sts = { 'in progress': 0, 'unstarted': 0, 'completed': 0 }
    tasks.map((task => {
      sts[task.status]++
    }))
    setStatuses(sts)
  }

  return (
    <div className="dashboard">
      <div className="row">
        <TaskList tasks={tasks} onDelete={handleDelete} onChange={handleChange} />
        <AddTask onAdd={addTask} />
      </div>
      <Stats statuses={statuses} total={tasks.length}/>
    </div>
  );
};
