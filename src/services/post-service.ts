import axiosInstance from "../shared/axiosInstance";
import { IPost } from "../shared/interfaces";

export const getAllPosts = async (pagination: {
  page: number;
  limit: number;
}) => {
  const { page, limit } = pagination;
  const { data } = await axiosInstance.get(
    `http://127.0.0.1:8080/post/findAll?page=${page}&limit=${limit}`
  );
  return data;
};

export const createPost = async (post: IPost) => {
  const { data } = await axiosInstance.post(
    `http://127.0.0.1:8080/post/create`,
    post
  );
  return data;
};
