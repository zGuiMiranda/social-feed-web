import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../../src/shared/interfaces";
import { createPost, getAllPosts } from "../../../src/services/post-service";

interface IPostState {
  posts: IPost[];
  postsCount: number;
  newPostAlert: boolean;
}

const initialState: IPostState = {
  posts: [],
  postsCount: 0,
  newPostAlert: false,
};

export const addPost = createAsyncThunk(
  "post/createPost",
  async (post: IPost) => {
    return createPost(post);
  }
);

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (data: { page: number; limit: number }) => {
    return getAllPosts(data);
  }
);

export const setNewPostAlert = createAsyncThunk(
  "post/setNewPostAlert",
  async () => {
    return;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addPost.fulfilled, (state) => {
      state.postsCount = state.postsCount + 1;
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = [];
      state.posts.push(...action.payload.data);
      state.postsCount = action.payload.count;
    });

    builder.addCase(setNewPostAlert.fulfilled, (state) => {
      state.newPostAlert = !state.newPostAlert;
    });
  },
});

export default postSlice.reducer;
