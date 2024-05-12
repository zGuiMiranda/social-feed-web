import { useEffect, useRef, useState } from "react";
import { PostCreator } from "../../components/post/postCreator";
import { Post } from "../../components/post/post";
import { RootState } from "../../../store/store";
import {
  addPost,
  getPosts,
  setNewPostAlert,
} from "../../../store/features/post/post-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { socket } from "../../../socket";
import "./feed-list.css";
//import { IPost } from "../../shared/interfaces";
import { TopButton } from "../../components/top-button/top-button";

export const FeedList = () => {
  const postsFromRedux = useAppSelector((state: RootState) => state.post.posts);
  const count = useAppSelector((state: RootState) => state.post.postsCount);

  const dispatch = useAppDispatch();

  const [posts, setPosts] = useState<{ content: string }[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [newPostsTrigger, setNewPostsTrigger] = useState(false);
  const listRef = useRef<any>(null);

  //const scrollToTop = () => listRef?.current?.scrollToItem(1, "center");

  const onCreatePost = async (content: string) => {
    await dispatch(addPost({ content }));
  };

  useEffect(() => {
    if (dispatch && page && limit) {
      dispatch(getPosts({ page, limit }));
      setNewPostsTrigger((prevState) => !prevState);
    }
    return () => {};
  }, [dispatch, page, limit]);

  useEffect(() => {
    if (newPostsTrigger === true) {
      setPosts((prevState) => [...prevState, ...postsFromRedux]);
      setNewPostsTrigger((prevState) => !prevState);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPostsTrigger]);

  const Row = ({ index }: { index: number }) => (
    <Post key={index} content={posts?.[index]?.content} />
  );

  const getMoreItems = () => {
    setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    // const addNewPost = (newPost: IPost) => {
    //   setPosts((prevState) => [newPost, ...prevState]);
    //   scrollToTop();
    // };
    // socket.on("message", (newPost: IPost) => addNewPost(newPost));
    const setPostAlert = () => {
      dispatch(setNewPostAlert());
    };
    socket.on("message", () => setPostAlert());

    return () => {
      socket.off("message");
    };
  }, [dispatch]);

  return (
    <>
      <TopButton />
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
