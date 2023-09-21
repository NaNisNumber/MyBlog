import LogOutBtn from "../account/log-out/LogOutBtn";
interface UserData {
  userId: string;
  userName: string;
}
interface Props {
  userPanelWidth: string;
  userPanelPositioning: string;
  userData: UserData;
}

const UserPanel = ({
  userPanelWidth,
  userPanelPositioning,
  userData,
}: Props) => {
  let userName: string = "";

  if (userData) {
    userName = userData.userName;
  }

  return (
    <div
      className={`${userPanelWidth} w-fitContent pt-4 pb-4 pl-2 pr-2 bg-darkPurple ${userPanelPositioning} flex flex-col justify-center gap-2`}
    >
      <LogOutBtn />
      <p className="text-white text-sm">username:{userName}</p>
    </div>
  );
};

export default UserPanel;
