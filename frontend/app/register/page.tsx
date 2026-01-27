"use client";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      alert("Account created!");
      window.location.href = "/login";
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div style={bg}>
      <div style={card}>
        <h2>Create Account</h2>

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

        <button onClick={register} style={btn}>Sign Up</button>

        <p style={{ marginTop: 12 }}>
          Already have an account?{" "}
          <a href="/login" style={link}>Login</a>
        </p>
      </div>
    </div>
  );
}

/* same styles */

const bg = {
  minHeight: "100vh",
  background: "#18498a",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const card = {
  background: "white",
  padding: 40,
  borderRadius: 16,
  width: 350,
  boxShadow: "0 12px 30px rgba(0,0,0,.12)",
  textAlign: "center"
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 14,
  border: "1px solid #ccc",
  borderRadius: 10
};

const btn = {
  width: "100%",
  background: "#2563eb",
  color: "white",
  padding: 12,
  border: "none",
  borderRadius: 12
  
};

const link = {
  color: "#3307f7",
  textDecoration: "none",
  fontWeight: 500,
  marginLeft: 100

};
