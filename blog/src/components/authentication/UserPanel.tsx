import LogOutBtn from "../account/log-out/LogOutBtn";
import { Link } from "react-router-dom";
interface UserData {
  userId: string;
  userName: string;
}
interface Props {
  userPanelWidth: string;
  userPanelPositioning: string;
  userData: UserData;
  favoritePosts: Set<string>;
}

const UserPanel = ({
  userPanelWidth,
  userPanelPositioning,
  userData,
  favoritePosts,
}: Props) => {
  let userName: string = "";

  if (userData) {
    userName = userData.userName;
  }

  return (
    <div
      className={`${userPanelWidth} w-fitContent py-4 px-8 bg-darkPurple ${userPanelPositioning} flex flex-col justify-center gap-2`}
    >
      <p className="text-white text-sm">Username: {userName}</p>
      <Link
        className="text-white text-sm  hover:text-gold"
        to={"/MyBlog/favorite-posts"}
      >
        Favorite Posts ({favoritePosts.size})
      </Link>
      <LogOutBtn />
    </div>
  );
};

export default UserPanel;
