export const logEvent = async (
  stack: "frontend",
  level: "info" | "debug" | "warn" | "error" | "fatal",
  pkg: "component" | "page" | "api" | "hook" | "state" | "style" | "auth" | "config" | "middleware" | "utils",
  message: string,
  token: string
) => {
  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });
    return await res.json();
  } catch (err) {
  }
};
