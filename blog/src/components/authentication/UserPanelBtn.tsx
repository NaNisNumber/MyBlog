interface Props {
  hoverBgColor: string;
  bgColor: string;
  panelIconStroke: string;
  displayUserPanel: boolean;
  setDisplayUserPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserPanelBtn = ({
  hoverBgColor,
  bgColor,
  panelIconStroke,
  displayUserPanel,
  setDisplayUserPanel,
}: Props) => {
  return (
    <button
      onClick={() => setDisplayUserPanel(!displayUserPanel)}
      className={`transition ease-out delay-150 bg-${bgColor} p-2 rounded-full shadow ${hoverBgColor} hover:shadow-darkPurple hover:shadow-inner`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#fff"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={panelIconStroke}
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    </button>
  );
};

export default UserPanelBtn;
