import PotatoAuthor from "../../images/potato.jpeg";
import Rectangle from "../../images/rectangle.png";
const Post = () => {
  function displayPostEyeHandler(e: React.MouseEvent<HTMLDivElement>) {
    const target: HTMLElement = e.currentTarget as HTMLElement;
    const postId = target.dataset.postId;
    const postEyeSvg = target.querySelector(`[data-post-svg-id="${postId}"]`);
    postEyeSvg?.classList.remove("opacity-0");
    postEyeSvg?.classList.add("-translate-y-2/4", "opacity-1");
  }

  function hidePostEyeHandler(e: React.MouseEvent<HTMLDivElement>) {
    const target: HTMLElement = e.currentTarget as HTMLElement;
    const postId = target.dataset.postId;
    const postEyeSvg = target.querySelector(`[data-post-svg-id="${postId}"]`);
    postEyeSvg?.classList.remove("-translate-y-2/4", "opacity-1");
    postEyeSvg?.classList.add("opacity-0");
  }

  return (
    <div className="w-4/5 m-auto font-sans grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:w-full">
      <div>
        <div className="flex justify-between text-white w-[95%] m-auto mb-2">
          <div className="flex items-center gap-2">
            <p>Author</p>
            <img className="w-6 h-6 rounded-full" src={PotatoAuthor} />
          </div>
          <p>date</p>
        </div>
        <div
          data-post-id="0"
          onMouseLeave={(e) => {
            hidePostEyeHandler(e);
          }}
          onMouseEnter={(e) => {
            displayPostEyeHandler(e);
          }}
          className="bg-white w-full h-40 md:h-52 post__img relative py-2 cursor-pointer"
        >
          <img className="absolute right-0 bottom-0" src={Rectangle} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke=""
            data-post-svg-id="0"
            className="stroke-white bg-gold bg-opacity-50 px-2 py-2 rounded-full w-16 h-16 absolute top-2/4 left-2/4 -translate-x-2/4 ease-in duration-200 opacity-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#F92222"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#F92222"
            className="w-6 h-6 absolute right-0 bottom-0 translate-y-[-25%]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>

          <p className="text-white font-sans text-base text-center">
            Some things about minecraft minecraftminecraft
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
