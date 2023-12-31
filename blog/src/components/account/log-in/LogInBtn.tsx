interface Props {
  toggle(type: string): void;
  setDisplayAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogInBtn = ({ toggle, setDisplayAuthForm }: Props) => {
  return (
    <button
      onClick={() => {
        toggle("login");
        setDisplayAuthForm(true);
      }}
      className="cursor-ponter transition duration-300 hover:bg-purple hover:text-white active:bg-darkPurple focus:outline-none focus:ring focus:ring-violet-300 bg-black text-white  border-none px-2 py-1  md:bg-white md:text-black md:py-1.5 md:px-3"
    >
      Log In
    </button>
  );
};

export default LogInBtn;
