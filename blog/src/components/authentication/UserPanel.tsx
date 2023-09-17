import LogOutBtn from "../account/log-out/LogOutBtn";

interface Props {
  userPanelWidth: string;
  userPanelPositioning: string;
}

const UserPanel = ({ userPanelWidth, userPanelPositioning }: Props) => {
  return (
    <div
      className={`${userPanelWidth} pt-4 pb-4 pl-2 pr-2 bg-darkPurple ${userPanelPositioning} flex flex-col justify-center gap-2`}
    >
      <LogOutBtn />
    </div>
  );
};

export default UserPanel;
