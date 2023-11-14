import axios from "axios";
import { BASE_URL, API_ENDPOINT_VERIFY_TOKEN } from "./Constants";

export const verifyToken = async (token) => {
  try {
    const response = await axios.get(BASE_URL + API_ENDPOINT_VERIFY_TOKEN, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.status == 200) {
      return true;
    }
    localStorage.removeItem("token");
    return false;
  } catch (err) {
    console.log("ERROR ==> ", err);
    localStorage.removeItem("token");
    return false;
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
};

export const downloadFile = (url, fileName = null) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const filename = fileName || getFileNameFromUrl(url);
      const objectURL = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = objectURL;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error("Error fetching the file", error);
    });
};

const getFileNameFromUrl = (url) => {
  return url.substring(url.lastIndexOf("/") + 1);
};
