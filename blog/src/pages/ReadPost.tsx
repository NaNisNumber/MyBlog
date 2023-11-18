import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createClient } from "@sanity/client";
interface PostDataObject {
  postImage: string;
  _createdAt: string;
  _id: string;
  authorImg: string;
  authorName: string;
  textBlock: string;
  title: string;
}
const ReadPost = () => {
  const [postData, setPostData] = useState([]);
  const postDataObject: PostDataObject = postData[0];
  const pathNameArr = useLocation().pathname.split("/");
  const postId = pathNameArr[pathNameArr.length - 1];
  let authorImg: string = "";
  let authorName: string = "";
  let postImage: string = "";
  let title: string = "";
  let createdAt: string = "";
  let date: Date = new Date();
  let day: number = 0;
  let month: string = "";
  let year: number = 0;
  let fullDate: string = "";
  let textBlock: string = "";

  if (postDataObject) {
    authorImg = postDataObject.authorImg;
    authorName = postDataObject.authorName;
    postImage = postDataObject.postImage;
    title = postDataObject.title;
    createdAt = postDataObject["_createdAt"];
    date = new Date(createdAt);
    day = date.getDate();
    month = date.toLocaleString("en-US", { month: "short" });
    year = date.getFullYear();
    fullDate = `${day} ${month} ${year}`;
    textBlock = postDataObject.textBlock;
  }

  const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: "production",
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: "2023-08-19", // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
  });

  useEffect(() => {
    async function getPosts() {
      const posts = await client.fetch(
        ` *[_type == 'post' && _id == '${postId}'] {
    'authorImg': author->image.asset->url,
    'authorName': author->name,
    'textBlock': body[0].children[0].text,
    title,
    'postImage': mainImage.asset->url,
    _createdAt,
    _id
  }`
      );
      return posts;
    }

    getPosts().then((post) => {
      setPostData(post);
    });
  }, []);

  return (
    <section className="flow-root pt-9 md:pt-0 px-6 pb-9 lg:px-8">
      <div className=" w-full flex flex-col mb-9">
        <p className="text-white self-center text-3xl mb-4">{title}</p>
        <div className="m-0-auto w-full md:w-4/5 h-72 mb-2">
          <img className="h-full w-full object-cover" src={postImage} />
        </div>
        <div className="flex justify-between text-white w-[95%] md:w-4/5 m-auto">
          <div className="flex items-center gap-2 text-sm">
            <p>{authorName}</p>
            <img className="w-6 h-6 rounded-full" src={authorImg} />
          </div>
          <p>{fullDate}</p>
        </div>
      </div>
      <div className="m-auto w-full md:w-3/5">
        <p className="text-white">{textBlock}</p>
      </div>
    </section>
  );
};

export default ReadPost;
