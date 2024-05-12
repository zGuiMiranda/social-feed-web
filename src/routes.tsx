import { FeedList } from "./pages/feed/feed-list";

export const routes = [
  {
    path: "/feed",
    component: () => {
      return <FeedList />;
    },
  },
];
