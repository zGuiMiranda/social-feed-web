import { useAppSelector } from "../../hooks";
import { RootState } from "../../../store/store";

interface ITopButton {
  textWarning: string;
  onClickFunction: () => void;
}

export const TopButton = ({ textWarning, onClickFunction }: ITopButton) => {
  const isVisible = useAppSelector(
    (state: RootState) => state.post.newPostAlert
  );

  return (
    <>
      {isVisible && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="p-2 hover:cursor-pointer hover:bg-pink-800 bg-pink-600 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
            role="alert"
            onClick={() => onClickFunction()}
          >
            <span className="flex rounded-full mt-0.5  bg-black uppercase px-2 py-1 text-xs font-bold mr-3">
              Updates!
            </span>
            <span className="font-semibold mr-2 text-left flex-auto">
              {textWarning}
            </span>
            <svg
              className="fill-current opacity-75 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};
