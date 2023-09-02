import React from "react";
import HeroSection from "../components/hero-section/HeroSection";
import PostsSection from "../components/posts-section/PostsSection";

const Home = () => {
  return (
    <React.Fragment>
      <HeroSection />
      <PostsSection />
    </React.Fragment>
  );
};

export default Home;
