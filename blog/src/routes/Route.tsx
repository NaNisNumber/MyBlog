import { Outlet } from "react-router-dom";
import Navbar from "../components/nav/Navbar";

export default function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer>some footer</footer>
    </>
  );
}
