import axios from "axios";

const LOG_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

export async function logEvent(
  stack: "frontend",
  level: "debug" | "info" | "warn" | "error" | "fatal",
  pkg: "api" | "component" | "hook" | "page" | "state" | "style" | "auth" | "config" | "middleware" | "utils",
  message: string
) {
  try {
    const res = await axios.post(LOG_ENDPOINT, {
      stack,
      level,
      package: pkg,
      message,
    });
    console.log("Log sent:", res.data);
  } catch (err) {
    console.error("Logging failed", err);
  }
}
