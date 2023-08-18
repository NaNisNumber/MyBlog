import React from "react";
import { useState } from "react";
import Searchbar from "../searchbar/Searchbar";
import TabsSelection from "../tabs-selection/TabsSelection";
import SelectFromDate from "../select-from-date/SelectFromDate";
import Post from "../PostComponent/Post";
const PostsSection = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

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
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
          <SelectFromDate />
        </div>
        <Post />
      </section>
    </React.Fragment>
  );
};

export default PostsSection;
