interface Props {
  toggle(type: string): void;
  setDisplayAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const RegisterBtn = ({ toggle, setDisplayAuthForm }: Props) => {
  return (
    <button
      onClick={() => {
        toggle("register");
        setDisplayAuthForm(true);
      }}
      className="cursor-ponter transition duration-300 hover:bg-purple hover:text-white active:bg-darkPurple focus:outline-none focus:ring focus:ring-violet-300 bg-gold font-bold text-black border-none px-2 py-1 md:py-1.5 md:px-3"
    >
      Register
    </button>
  );
};

export default RegisterBtn;
