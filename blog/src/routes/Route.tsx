import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import { useState } from "react";
interface ContextType {
  favoritePosts: Set<string>;
  setFavoritePosts: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export default function Root() {
  const [favoritePosts, setFavoritePosts] = useState<Set<string>>(new Set());

  return (
    <>
      <Navbar favoritePosts={favoritePosts} />
      <Outlet context={{ favoritePosts, setFavoritePosts }} />
      <footer>some footer</footer>
    </>
  );
}
export function useSetFavoritesPosts() {
  return useOutletContext<ContextType>();
}
