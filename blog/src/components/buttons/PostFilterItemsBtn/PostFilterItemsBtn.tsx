import React from "react";
interface Props {
  criterionName: string;
}
const PostFilterItemsBtn = ({ criterionName }: Props) => {
  return (
    <React.Fragment>
      <button className="bg-gold font-semibold text-base text-darkPurple cursor-[inherit] px-4 py-0">
        {criterionName}
      </button>
    </React.Fragment>
  );
};

export default PostFilterItemsBtn;
