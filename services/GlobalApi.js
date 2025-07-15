import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const createNewResume = (data) => axiosClient.post("user-resumes", data);

const getUserResumes = (userEmail) =>
  axiosClient.get(
    `user-resumes?filters[userEmail][$eq]=${userEmail}&sort[0]=updatedAt:desc`
  );

const getUserResumeOne = (resumeId) =>
  axiosClient.get("user-resumes?filters[resumeId][$eq]=" + resumeId);

const updateResume = (id, data) => axiosClient.put("user-resumes/" + id, data);

const deleteResume = (id) => axiosClient.delete("user-resumes/" + id);

export default {
  createNewResume,
  getUserResumes,
  getUserResumeOne,
  updateResume,
  deleteResume,
};
