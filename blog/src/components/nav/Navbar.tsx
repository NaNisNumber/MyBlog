import { Fragment, useRef, useState } from "react";
import LogInBtn from "../account/log-in/LogInBtn";
import RegisterBtn from "../account/register/RegisterBtn";
// import LogOutBtn from "../account/log-out/LogOutBtn";

const Navbar = () => {
  const [navOpened, setNavOpened] = useState<boolean>(false);
  const nav = useRef(null);

  function openNavbar() {
    setNavOpened(true);
  }
  function closeNavbar() {
    setNavOpened(false);
  }
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
        className="md:hidden w-70 xsm:w-80 bg-white px-5 py-3 fixed bottom-0 top-0 border-l-0 border-b-0 border-solid border-4 border-gold transition duration-500 ease-out z-999"
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
          <div className="flex gap-2.5 mb-6">
            <RegisterBtn />
            <LogInBtn />
          </div>
          <div className="flex gap-2 flex-col items-center text-black">
            <li className=" text-sm ">Home</li>
            <li className=" text-sm ">Contact</li>
          </div>
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
          <div className="flex gap-2.5">
            <RegisterBtn />
            <LogInBtn />
          </div>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
