import { useEffect, useRef, useState } from "react";
import { PostCreator } from "../../components/post/postCreator";
import { Post } from "../../components/post/post";
import { RootState } from "../../../store/store";
import {
  addPost,
  getPosts,
  loadPostFromSocketAlert,
  setNewPostAlert,
} from "../../../store/features/post/post-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { socket } from "../../../socket";
import "./feed-list.css";
import { TopButton } from "../../components/top-button/top-button";
import { IPost } from "../../shared/interfaces";

export const FeedList = () => {
  const postsFromRedux = useAppSelector((state: RootState) => state.post.posts);
  const count = useAppSelector((state: RootState) => state.post.postsCount);

  const dispatch = useAppDispatch();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const listRef = useRef<any>(null);
  const userMockId = import.meta.env.VITE_CURRENT_USER_MOCK_ID;
  const scrollToTop = () => listRef?.current?.scrollToItem(0, "center");

  const resetScroll = () => {
    scrollToTop();
    setPage(1);
  };

  const onCreatePost = async (content: string) => {
    await dispatch(addPost({ content }));
    resetScroll();
  };

  useEffect(() => {
    if (page && limit) dispatch(getPosts({ page, limit }));
    return () => {};
  }, [dispatch, limit, page]);

  useEffect(() => {
    setPosts(postsFromRedux);
    return () => {};
  }, [postsFromRedux]);

  const Row = ({ index }: { index: number }) => (
    <Post key={index} content={posts?.[index]?.content} />
  );

  const getMoreItems = () => {
    setPage((prevState) => prevState + 1);
  };

  const resetPosts = async () => {
    await dispatch(loadPostFromSocketAlert());
    resetScroll();
    dispatch(setNewPostAlert());
  };

  useEffect(() => {
    const setPostAlert = (post: IPost) => {
      if (post.user && post.user !== userMockId) dispatch(setNewPostAlert());
    };
    socket.on("message", (post: IPost) => setPostAlert(post));

    return () => {
      socket.off("message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userMockId]);

  return (
    <>
      {/* <span className="text-cyan-100">{posts.length}</span> */}
      <TopButton
        textWarning="New posts available. Click here to update!"
        onClickFunction={resetPosts}
      />
      <PostCreator publishPost={onCreatePost} />
      <InfiniteLoader
        isItemLoaded={(index) => index < posts.length}
        itemCount={posts.length < count ? posts.length + 1 : posts.length}
        loadMoreItems={getMoreItems}
        threshold={0}
      >
        {({ onItemsRendered }) => (
          <FixedSizeList
            height={posts.length * 110}
            itemCount={posts.length < count ? posts.length + 1 : posts.length}
            itemSize={200}
            onItemsRendered={onItemsRendered}
            ref={listRef}
            width="100%"
            className="List"
          >
            {Row}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </>
  );
};
