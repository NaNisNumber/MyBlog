import React from "react";
import { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import Pagination from "../pagination/Pagination";
import Searchbar from "../searchbar/Searchbar";
import TabsSelection from "../tabs-selection/TabsSelection";
import SelectFromDate from "../select-from-date/SelectFromDate";
import Post from "../PostComponent/Post";
const PostsSection = () => {
  const postRequestLimit: number = 3;
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [posts, setPosts] = useState([]);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(postRequestLimit);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [currentPageId, setCurrentPageId] = useState<number>(1);
  const [pageDirection, setPageDirection] = useState<string>("");
  const [orderType, setOrderType] = useState<string>(`desc`);
  const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: "production",
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: "2023-08-19", // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
  });

  // uses GROQ to query content: https://www.sanity.io/docs/groq

  // query for posts based on category
  function resetPage(category: string) {
    setCategory(category);
    setFrom(0);
    setTo(postRequestLimit);
    setCurrentPageId(1);
    setPageDirection("");
    setReachedEnd(false);
  }

  useEffect(() => {
    if (!category) return;
    async function getPosts() {
      const posts = await client.fetch(
        `*[_type == 'post' && references('${category}')] | order(_createdAt ${orderType})` +
          `{
    'authorImg': author->image.asset->.url,
    'authorName': author->name,
    'textBlock': body[0].children[0].text,
    title,
    'postImage':mainImage.asset->.url,
    _createdAt,
    _id
  }[0...${postRequestLimit}]`
      );
      return posts;
    }

    getPosts().then((posts) => {
      setPosts(posts);
    });
  }, [category]);

  useEffect(() => {
    if (category) return;

    async function getPosts() {
      const initialPosts = await client.fetch(
        `*[_type == 'post'] | order(_createdAt desc)` +
          `{
    'authorImg': author->image.asset->.url,
    'authorName': author->name,
    'textBlock': body[0].children[0].text,
    title,
    'postImage':mainImage.asset->.url,
    _createdAt,
    _id
  }[0...${postRequestLimit}]`
      );
      return initialPosts;
    }

    getPosts().then((initialPosts) => {
      setPosts(initialPosts);
    });
  }, [category]);

  async function fetchPageHandler(page: string) {
    setPageDirection(page);
    if (page === "next") {
      if (reachedEnd) return;
      setFrom(to);
      setTo((prevTo) => prevTo + postRequestLimit);
    } else if (page === "prev") {
      if (from === 0 && to === postRequestLimit) return;

      if (reachedEnd) {
        /* in this case if from is === 3 and to === 6 and you reached the end you will go back to the initial page */
        if (from === postRequestLimit && to === postRequestLimit * 2) {
          setFrom(0);
          setTo(postRequestLimit);
          setReachedEnd(false);
        } else {
          /* in this case if from is anything but the limit and to is anything but postRequestLimit * 2
           and you reached the end you will go back one page.
           For example if the last page that has posts have the from===9 and to===12 and you go to 12 / 15 
           and there are no more posts that means you reached the end. When you go prev => reachedEnd===true
           => we extract from the "from" and "to" going back to 6 / 9 which is the page before the one we see at the reached end.
           */
          setFrom((prevFrom) => prevFrom - 2 * postRequestLimit);
          setTo((prevTo) => prevTo - 2 * postRequestLimit);
          setCurrentPageId((prevPageId) => +prevPageId - 1);
          setReachedEnd(false);
        }
      }

      if (!reachedEnd) {
        setFrom((prevFrom) => prevFrom - postRequestLimit);
        setTo((prevTo) => prevTo - postRequestLimit);
        setCurrentPageId((prevPageId) => +prevPageId - 1);
      }
    }
  }

  useEffect(() => {
    function verifyAndSet(posts: []) {
      if (pageDirection === "next" && posts.length > 0) {
        setCurrentPageId((prevPageId) => +prevPageId + 1);
      }
      if (posts.length === 0) {
        setReachedEnd(true);
        return;
      }
      setPosts(posts);
    }

    async function getPosts() {
      const posts = await client.fetch(
        `*[_type == 'post']| order(_createdAt ${orderType})[${from}...${to}]` +
          `{
    'authorImg': author->image.asset->.url,
    'authorName': author->name,
    'textBlock': body[0].children[0].text,
    title,
    'postImage':mainImage.asset->.url,
    _createdAt,
    _id
  }`
      );

      return posts;
    }

    async function getPostsByCategory() {
      const posts = await client.fetch(
        `*[_type == 'post' && references('${category}')] | order(_createdAt ${orderType})[${from}...${to}]` +
          `{
    'authorImg': author->image.asset->.url,
    'authorName': author->name,
    'textBlock': body[0].children[0].text,
    title,
    'postImage':mainImage.asset->.url,
    _createdAt,
    _id
  }`
      );

      return posts;
    }
    if (!category) {
      getPosts().then((posts) => {
        verifyAndSet(posts);
      });
    }

    if (category) {
      getPostsByCategory().then((posts) => {
        verifyAndSet(posts);
      });
    }
  }, [from, to, orderType]);

  const postElements = posts.map((postData, i) => {
    return <Post key={i} postData={postData} />;
  });

  return (
    <React.Fragment>
      <section
        onMouseUp={() => {
          setIsDragging(false);
        }}
        className="px-5 pb-9 md:py-5 lg:px-8"
      >
        <div className="flex flex-col gap-4 items-center sm:max-w-[80%] md:max-w-[50%] m-auto overflow-hidden mb-6">
          <Searchbar />
          <TabsSelection
            resetPage={resetPage}
            setFrom={setFrom}
            setTo={setTo}
            postRequestLimit={postRequestLimit}
            setCurrentPageId={setCurrentPageId}
            setPageDirection={setPageDirection}
            setReachedEnd={setReachedEnd}
            category={category}
            setCategory={setCategory}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
          <SelectFromDate
            resetPage={resetPage}
            category={category}
            orderType={orderType}
            setOrderType={setOrderType}
          />
        </div>
        <div className="w-4/5 m-auto font-sans grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:w-full mb-3">
          {postElements}
        </div>
        <Pagination
          currentPageId={currentPageId}
          fetchPageHandler={fetchPageHandler}
        />
      </section>
    </React.Fragment>
  );
};

export default PostsSection;
