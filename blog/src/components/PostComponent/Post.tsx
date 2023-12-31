import Rectangle from "../../images/rectangle.png";
import { Link } from "react-router-dom";

interface Props {
  postData: {
    authorImg: string;
    authorName: string;
    postImage: string;
    textBlock: string;
    title: string;
    _createdAt: string;
    _id: string;
    isFavorite: boolean;
  };
  favoritePosts: Set<string>;
  setFavoritePosts: React.Dispatch<React.SetStateAction<Set<string>>>;
  uid: string | undefined;
  setCommittedPostAction?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Post = (props: Props) => {
  const favoritePosts: Set<string> = props.favoritePosts;
  const uid: string | undefined = props.uid;
  const setFavoritePosts: React.Dispatch<React.SetStateAction<Set<string>>> =
    props.setFavoritePosts;
  const authorImg: string = props.postData.authorImg;
  const authorName: string = props.postData.authorName;
  const postImage: string = props.postData.postImage;
  const title: string = props.postData.title;
  const createdAt: string = props.postData._createdAt;
  const isFavorite: boolean = props.postData.isFavorite;
  const date: Date = new Date(createdAt);
  const postId: string = props.postData._id;
  const day: number = date.getDate();
  const month: string = date.toLocaleString("en-US", { month: "short" });
  const year: number = date.getFullYear();
  const fullDate: string = `${day} ${month} ${year}`;
  const setCommittedPostAction:
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined = props.setCommittedPostAction;

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

  function clientAddPostsToFavorite(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (!uid) return;
    const parentEl: HTMLElement = e.currentTarget.parentElement as HTMLElement;
    const heartSvg: HTMLElement = e.currentTarget.firstChild as HTMLElement;
    const postId: string = parentEl.dataset.postId as string;
    if (postId && setCommittedPostAction) {
      setCommittedPostAction(true);
    }
    let postIdExist: boolean = false;
    // check if this postId currently exists in the favoritePosts array and if it exist don't add it

    if (favoritePosts.size === 0) {
      heartSvg.classList.add("heart__animation");
      setFavoritePosts((prevFavPosts) => {
        const prevFavPosts2 = new Set([...prevFavPosts]);
        prevFavPosts2.add(postId);
        return prevFavPosts2;
      });
    } else {
      if (favoritePosts.has(postId)) {
        // if the post id that we try to add already exist on the list we will filter the list and get rid of it
        heartSvg.classList.remove("heart__animation");
        postIdExist = true;

        const remainingFavoritePosts: string[] = [];
        for (const post of favoritePosts) {
          if (post != postId) {
            remainingFavoritePosts.push(post);
          }
        }
        setFavoritePosts(new Set([...remainingFavoritePosts]));
      }

      if (!postIdExist) {
        heartSvg.classList.add("heart__animation");
        // and if it does not exist we will add it next to the others
        setFavoritePosts((prevFavPostIds) => {
          const prevPostIds = new Set([...prevFavPostIds]);
          prevPostIds.add(postId);
          return prevPostIds;
        });
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between text-white w-[95%] m-auto mb-2">
        <div className="flex items-center gap-2">
          <p>{authorName}</p>
          <img className="w-6 h-6 rounded-full" src={authorImg} />
        </div>
        <p>{fullDate}</p>
      </div>
      <div className="relative" data-post-id={`${postId}`}>
        <Link to={`/MyBlog/post/${postId}`}>
          <div
            data-post-id={`${postId}`}
            onMouseLeave={(e) => {
              hidePostEyeHandler(e);
            }}
            onMouseEnter={(e) => {
              displayPostEyeHandler(e);
            }}
            className="bg-white w-full h-40 md:h-52  relative py-2 cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${postImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <img className="absolute right-0 bottom-0" src={Rectangle} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke=""
              data-post-svg-id={`${postId}`}
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

            <p className="text-white font-sans text-base text-center">
              {title}
            </p>
          </div>
        </Link>
        <button
          className="absolute right-0 bottom-0 translate-y-[-25%]"
          onClick={(e) => clientAddPostsToFavorite(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorite ? "#F92222" : "#fff"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={isFavorite ? "#F92222" : "#fff"}
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Post;
