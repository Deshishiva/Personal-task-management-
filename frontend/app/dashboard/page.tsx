"use client";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const loadTasks = async () => {
    if (!token) return;
    const res = await fetch("http://personal-task-management-nx0a.onrender.com/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(await res.json());
  };

  useEffect(() => {
    loadTasks();
  }, [token]);

  const addTask = async () => {
    if (!title.trim()) return;

    await fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    });

    setTitle("");
    loadTasks();
  };

  const saveEdit = async (id:number) => {
    await fetch(`http://localhost:4000/tasks/${id}`, {
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({ title: editingTitle })
    });
    setEditingId(null);
    loadTasks();
  };

  const deleteTask = async (id:number) => {
    await fetch(`http://localhost:4000/tasks/${id}`, {
      method:"DELETE",
      headers:{ Authorization:`Bearer ${token}` }
    });
    loadTasks();
  };

  const toggleTask = async (id:number) => {
    await fetch(`http://localhost:4000/tasks/${id}/toggle`, {
      method:"PATCH",
      headers:{ Authorization:`Bearer ${token}` }
    });
    loadTasks();
  };

  return (
    <div className="page" style={bg}>
      <div style={card}>
        <div style={header}>
          <h1>My Tasks</h1>
          <button onClick={logout} style={logoutBtn}>Logout</button>
        </div>

        <div style={addBox}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Add a new task..."
            style={input}
          />
          <button onClick={addTask} style={addBtn}>Add</button>
        </div>

        {tasks.length === 0 && <p style={{color:"#777"}}>No tasks yet</p>}

        {tasks.map(task => (
          <div key={task.id} className="task" style={taskCard}>
            {editingId === task.id ? (
              <>
                <input
                  value={editingTitle}
                  onChange={e => setEditingTitle(e.target.value)}
                  style={input}
                />
                <button onClick={() => saveEdit(task.id)} style={saveBtn}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span style={{
                  flex:1,
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#16a34a" : "#111"
                }}>
                  {task.title}
                </span>

                <div>
                  <button onClick={() => toggleTask(task.id)} style={doneBtn}>
                    {task.completed ? "Undo" : "Done"}
                  </button>
                  <button
                    style={editBtn}
                    onClick={() => {
                      setEditingId(task.id);
                      setEditingTitle(task.title);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteTask(task.id)} style={delBtn}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const bg = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  background: "linear-gradient(-20deg, #3954ca, #7d28d1, #195a93, #21c6ce)",
  backgroundSize: "400% 400%",
  animation: "gradientMove 12s ease infinite"
};
const card = {
  background:"white",
  width:"100%",
  maxWidth:700,
  padding:30,
  borderRadius:18,
  boxShadow:"0 15px 35px rgba(0,0,0,.12)"
};

const header = {
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:20
};

const addBox = {
  display:"flex",
  gap:10,
  marginBottom:20
};

const input = {
  flex:1,
  padding:12,
  border:"1px solid #ccc",
  borderRadius:10
};

const addBtn = {
  background:"#2563eb",
  color:"white",
  border:"none",
  padding:"12px 22px",
  borderRadius:12
};

const logoutBtn = {
  background:"#f80000",
  color:"white",
  border:"none",
  padding:"10px 18px",
  borderRadius:12,
  
};

const taskCard = {
  display:"flex",
  alignItems:"center",
  justifyContent:"space-between",
  background:"#f9fafb",
  padding:14,
  borderRadius:14,
  marginBottom:12
};

const doneBtn = { marginRight:6 };
const editBtn = { marginRight:6 };
const delBtn = { color:"red" };
const saveBtn = { background:"#10b981", color:"white", border:"none", padding:"8px 12px" };
