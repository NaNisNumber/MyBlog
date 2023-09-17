import { Fragment, useRef, useState, useEffect } from "react";
import LogInBtn from "../account/log-in/LogInBtn";
import RegisterBtn from "../account/register/RegisterBtn";
import UserPanelBtn from "../authentication/UserPanelBtn";
import UserPanel from "../authentication/UserPanel";
import { AuthenticationForm } from "../authentication/AuthenticationForm";
import { auth } from "../../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useToggle } from "@mantine/hooks";

const Navbar = () => {
  const [navOpened, setNavOpened] = useState<boolean>(false);
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [displayUserPanel, setDisplayUserPanel] = useState(false);
  const [type, toggle] = useToggle(["login", "register"]);
  const [displayAuthForm, setDisplayAuthForm] = useState(false);
  const nav = useRef(null);

  function openNavbar() {
    setNavOpened(true);
  }
  function closeNavbar() {
    setNavOpened(false);
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUserIsLogged(true);
      } else {
        // User is signed out

        setUserIsLogged(false);
      }
    });
  }, []);

  return (
    <Fragment>
      <button className="absolute" onClick={openNavbar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="w-6 h-6 ml-5 mt-3 md:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <nav
        ref={nav}
        className="md:hidden w-72 xsm:w-80 bg-white px-5 py-3 fixed bottom-0 top-0 border-l-0 border-b-0 border-solid border-4 border-gold transition duration-500 ease-out z-999"
        style={{ transform: navOpened ? "translate(0)" : "translate(-100%)" }}
      >
        <svg
          onClick={closeNavbar}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#fff"
          className="w-6 h-6 absolute right-neg4 top-neg4 bg-black border-solid border-4 border-gold border-t-0 border-r-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <ul className="flex flex-col justify-between items-center font-sans mt-8">
          <div className="flex justify-center gap-2.5 mb-6 w-full  relative">
            {!userIsLogged && (
              <RegisterBtn
                toggle={toggle}
                setDisplayAuthForm={setDisplayAuthForm}
              />
            )}
            {!userIsLogged && (
              <LogInBtn
                toggle={toggle}
                setDisplayAuthForm={setDisplayAuthForm}
              />
            )}
            {!userIsLogged && displayAuthForm && (
              <AuthenticationForm
                type={type}
                toggle={toggle}
                setDisplayAuthForm={setDisplayAuthForm}
              />
            )}
            {userIsLogged && (
              <UserPanelBtn
                hoverBgColor={"hover__bg-color-white"}
                bgColor={"darkPurple"}
                panelIconStroke={"#3a243b"}
                displayUserPanel={displayUserPanel}
                setDisplayUserPanel={setDisplayUserPanel}
              />
            )}
            {userIsLogged && displayUserPanel && (
              <UserPanel
                userPanelPositioning={"panel__positioning-mobile"}
                userPanelWidth={"panel__width-mobile"}
              />
            )}
          </div>
          {!displayAuthForm && (
            <div className="flex gap-2 flex-col items-center text-black">
              <li className=" text-sm ">Home</li>
            </div>
          )}
        </ul>
      </nav>

      <nav className="w-full hidden md:block  bg-black px-12 py-6 sticky top-0 z-999">
        <ul className="flex justify-between items-center font-sans">
          <div className="flex gap-5 items-center ">
            <li className=" text-sm transition duration-300 text-white cursor-pointer hover:-translate-y-1 ">
              Home
            </li>
            <li className=" text-sm transition duration-300 text-white cursor-pointer hover:-translate-y-1 ">
              Contact
            </li>
          </div>
          <div
            className={`flex gap-2.5 relative ${
              userIsLogged && "w-[7rem]"
            } justify-center`}
          >
            {!userIsLogged && (
              <RegisterBtn
                toggle={toggle}
                setDisplayAuthForm={setDisplayAuthForm}
              />
            )}
            {!userIsLogged && (
              <LogInBtn
                toggle={toggle}
                setDisplayAuthForm={setDisplayAuthForm}
              />
            )}
            {!userIsLogged && displayAuthForm && (
              <AuthenticationForm
                type={type}
                toggle={toggle}
                setDisplayAuthForm={setDisplayAuthForm}
              />
            )}
            {userIsLogged && (
              <UserPanelBtn
                hoverBgColor={"hover__bg-color-white"}
                bgColor={"black"}
                panelIconStroke={"black"}
                displayUserPanel={displayUserPanel}
                setDisplayUserPanel={setDisplayUserPanel}
              />
            )}
            {userIsLogged && displayUserPanel && (
              <UserPanel
                userPanelPositioning={"panel__positioning-desktop"}
                userPanelWidth={"panel__width-desktop"}
              />
            )}
          </div>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
