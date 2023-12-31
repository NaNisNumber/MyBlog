import { signOut } from "firebase/auth";
import { auth } from "../../../../firebaseConfig";

const LogOutBtn = () => {
  const logOut = () => {
    signOut(auth);
  };
  return (
    <button onClick={logOut} className="text-white border-none hover:text-gold">
      Log out
    </button>
  );
};

export default LogOutBtn;
