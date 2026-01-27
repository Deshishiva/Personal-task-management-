"use client";
import { useState, CSSProperties } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("https://personal-task-management-nx0a.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={bg}>
      <div style={card}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={login} style={btn}>Login</button>

        <p style={{ marginTop: 12 }}>
          Don’t have an account?{" "}
          <a href="/register" style={link}>Create Account</a>
        </p>
      </div>
    </div>
  );
}

/* styles with proper typing */

const bg: CSSProperties = {
  minHeight: "100vh",
  background: "#4b87d6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const card: CSSProperties = {
  background: "white",
  padding: 40,
  borderRadius: 16,
  width: 350,
  boxShadow: "0 12px 30px rgba(0,0,0,.12)",
  textAlign: "center"
};

const input: CSSProperties = {
  width: "100%",
  padding: 12,
  marginBottom: 14,
  border: "1px solid #ccc",
  borderRadius: 10
};

const btn: CSSProperties = {
  width: "100%",
  background: "#2563eb",
  color: "white",
  padding: 12,
  border: "none",
  borderRadius: 12
};

const link: CSSProperties = {
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: 500
};
