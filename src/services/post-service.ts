import axiosInstance from "../shared/axiosInstance";
import { IPost } from "../shared/interfaces";

const postUrl = "post";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getAllPosts = async (pagination: {
  page: number;
  limit: number;
}) => {
  const { page, limit } = pagination;
  const { data } = await axiosInstance.get(
    `${backendUrl}/${postUrl}/findAll?page=${page}&limit=${limit}`
  );
  return data;
};

export const createPost = async (post: IPost) => {
  const { data } = await axiosInstance.post(
    `${backendUrl}/${postUrl}/create`,
    post
  );
  return data;
};
