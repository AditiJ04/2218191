/*import axios from "axios";

const BASE_URL = "http://localhost:3001"; // change to your backend running port

export const createShortUrl = async ({ url, shortcode, validity }: any) => {
  const body = {
    url,
    ...(shortcode && { shortcode }),
    ...(validity && { validity: parseInt(validity) }),
  };

  const res = await axios.post(`${BASE_URL}/shorturls`, body);
  return res.data;
};

export const getStats = async (shortcode: string) => {
  const res = await axios.get(`${BASE_URL}/shorturls/${shortcode}`);
  return res.data;
};
*/
import axios from "axios";
import { logEvent } from "../logger";

const API = axios.create({
  baseURL: "http://localhost:5000", // Your backend mock server
});

export const shortenUrl = async (data: {
  url: string;
  validity?: number;
  shortcode?: string;
}) => {
  try {
    const res = await API.post("/shorturls", data);
    await logEvent("frontend", "info", "api", "Short URL created successfully");
    return res.data;
  } catch (err) {
    await logEvent("frontend", "error", "api", "Error creating short URL");
    throw err;
  }
};

export const getStats = async (code: string) => {
  try {
    const res = await API.get(`/shorturls/${code}`);
    await logEvent("frontend", "info", "api", "Stats retrieved successfully");
    return res.data;
  } catch (err) {
    await logEvent("frontend", "error", "api", "Error retrieving stats");
    throw err;
  }
};
