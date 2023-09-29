import React from "react";
import HeroSection from "../components/hero-section/HeroSection";
import PostsSection from "../components/posts-section/PostsSection";
import { useSetFavoritesPosts } from "../routes/Route";

const Home = () => {
  const { favoritePosts, setFavoritePosts } = useSetFavoritesPosts();

  return (
    <React.Fragment>
      <HeroSection />
      <PostsSection
        favoritePosts={favoritePosts}
        setFavoritePosts={setFavoritePosts}
      />
    </React.Fragment>
  );
};

export default Home;
