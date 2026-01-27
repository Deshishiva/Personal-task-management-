"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      alert("Invalid email or password");
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div style={bg}>
      <div style={card}>
        <h1 style={{ marginBottom: 20 }}>Task Manager</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={login} style={loginBtn}>
          Login
        </button>

        <div style={{ marginTop: 20 }}>
          <span style={{ color: "#555" }}>New here?</span>
          <br />
          <a href="/register">
            <button style={signupBtn}>Create Account</button>
          </a>
        </div>
      </div>
    </div>
  );
}

/* Styles */

const bg = {
  background: "linear-gradient(135deg, #e0f2fe, #f0f9ff)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const card = {
  background: "white",
  padding: 40,
  width: 380,
  borderRadius: 12,
  boxShadow: "0 8px 22px rgba(0,0,0,.12)",
  textAlign: "center" as const
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 14,
  border: "1px solid #ccc",
  borderRadius: 6,
  fontSize: 14
};

const loginBtn = {
  width: "100%",
  padding: 12,
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 6,
  fontSize: 15,
  cursor: "pointer"
};

const signupBtn = {
  marginTop: 10,
  padding: "10px 28px",
  background: "#10b981",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};
