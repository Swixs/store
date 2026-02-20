const API_BASE = process.env.REACT_APP_API_URL || "";

export async function authRequest(action, body) {
  const res = await fetch(`${API_BASE}/api/auth.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...body }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Request failed.");
  return data;
}

export async function register(username, login, password) {
  return authRequest("register", { username, login, password });
}

export async function login(login, password) {
  return authRequest("login", { login, password });
}
