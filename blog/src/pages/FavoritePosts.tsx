import { useSetFavoritesPosts } from "../routes/Route";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth, app } from "../../firebaseConfig";
import { createClient } from "@sanity/client";
import Post from "../components/PostComponent/Post";

interface PostData {
  authorImg: string;
  authorName: string;
  postImage: string;
  textBlock: string;
  title: string;
  _createdAt: string;
  _id: string;
  isFavorite: boolean;
}
const FavoritePosts = () => {
  const { favoritePosts, setFavoritePosts } = useSetFavoritesPosts(); // the id's for the posts
  const [posts, setPosts] = useState([]); // the posts that come from sanity based on the id's provided from firebase db
  const [uid, setUid] = useState<string>();
  const db = getFirestore(app);
  const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: "production",
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: "2023-08-19", // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user

        const uid: string = user.uid;
        setUid(uid);
      }
    });
  }, []);

  useEffect(() => {
    if (!uid) return;
    if (favoritePosts.size > 0) return;
    const docRef = doc(db, "users", uid);
    async function getUserData() {
      const docSnap = await getDoc(docRef);
      let data;
      let favPosts: Set<string>;
      if (docSnap.exists()) {
        data = docSnap.data();
        favPosts = new Set(data.favoritePosts);
        setFavoritePosts(favPosts);
      }
    }
    getUserData();
  }, [uid]);

  useEffect(() => {
    async function getPosts() {
      const posts = await client.fetch(
        `*[_type == 'post' && _id in ${JSON.stringify([...favoritePosts])}] {
      'authorImg': author->image.asset->.url,
      'authorName': author->name,
      'textBlock': body[0].children[0].text,
      title,
      'postImage': mainImage.asset->.url,
      _createdAt,
      _id
    }`
      );
      return posts;
    }

    getPosts().then((posts) => {
      setPosts(posts);
    });
  }, [favoritePosts]);

  const postElements = posts.map((postData: PostData, i) => {
    postData.isFavorite = false;
    const postId: string = postData["_id"];
    if (favoritePosts.has(postId)) {
      postData.isFavorite = true;
    }
    return (
      <Post
        key={i}
        postData={postData}
        favoritePosts={favoritePosts}
        setFavoritePosts={setFavoritePosts}
        userIsLogged={uid ? true : false}
      />
    );
  });

  return (
    <section className="px-5 pb-9 py-5 lg:px-8">
      <div className="w-4/5 m-auto font-sans grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:w-full mb-3">
        {postElements}
      </div>
    </section>
  );
};

export default FavoritePosts;
