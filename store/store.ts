import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./features/post/post-slice";

export const store = configureStore({
  reducer: {
    post: PostSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
