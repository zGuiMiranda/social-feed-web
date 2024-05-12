import { useState } from "react";

interface IPostCreator {
  publishPost: (content: string) => void;
}

export const PostCreator = ({ publishPost }: IPostCreator) => {
  const [content, setContent] = useState("");

  const createPost = () => {
    publishPost(content);
    setContent("");
  };
  return (
    <>
      <div className="mt-3 p-3  flex flex-col border-dashed items-center max-2xl:w-max mx-auto rounded-lg shadow md:flex-row xl:max-w-3xl md:max-w-xl dark:bg-black">
        <div className="flex  max-w-6xl min-w-max rounded flex-col justify-between p-3 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Post
          </label>
          <textarea
            id="message"
            rows={4}
            className="p-2.5 lg:w-[720px] focus:outline focus:outline-[1px] focus:outline-[#dc1783]  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Write your post...."
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setContent(value)
            }
            value={content}
          ></textarea>

          <button
            type="button"
            onClick={() => createPost()}
            className="mt-2 lg:w-2/12  px-5 py-2.5 mb-2 lg:place-self-end sm:w-full focus:outline-none text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm  dark:bg-[#dc1783] dark:hover:bg-pink-900 dark:focus:ring-pink-900"
          >
            Publish Post
          </button>
        </div>
        <div></div>
      </div>
    </>
  );
};
