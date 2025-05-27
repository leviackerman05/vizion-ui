// src/lib/auth.ts
export async function login(email: string, password: string) {
  const res = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid credentials");

  const data = await res.json();
  localStorage.setItem("token", data.idToken);
  localStorage.setItem("uid", data.uid);
}
