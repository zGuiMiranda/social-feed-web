import { IPost } from "../../shared/interfaces";

export const Post = ({ content }: IPost) => {
  return (
    <>
      <div className="mt-3 p-3 min-h-40 max-h-52 flex flex-col border-dashed  max-2xl:w-max mx-auto rounded-lg shadow md:flex-row xl:max-w-5xl md:max-w-xl   dark:bg-black">
        <span className="text-white whitespace-pre-line text-justify">
          {content}
        </span>
      </div>
    </>
  );
};
