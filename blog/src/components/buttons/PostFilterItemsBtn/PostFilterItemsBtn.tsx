import React, { useEffect } from "react";
interface Props {
  resetPage(category: string | undefined): void;
  category: string | undefined;
  criterionName: string;
  dataCategory: string;
  tracerOldValue: number;
  tracerNewValue: number;
  searchbarQueryValueExist: boolean;
}

const PostFilterItemsBtn = ({
  resetPage,
  criterionName,
  dataCategory,
  category,
  tracerOldValue,
  tracerNewValue,
  searchbarQueryValueExist,
}: Props) => {
  function applyInitialBtnStyles(btns: NodeListOf<Element>) {
    for (let i = 0; i < btns.length; i++) {
      const btn = btns[i];
      btn.classList.remove("bg-darkPurple", "text-white");
      btn.classList.add("bg-gold", "text-darkPurple");
    }
  }

  function applyCurrentBtnStyle(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    //current btn
    const currentBtn = e.currentTarget;
    //select all category btns
    const btns = document.querySelectorAll(".category__btn");
    //first remove the current styles from all btns and add back the initial styles;
    applyInitialBtnStyles(btns);
    //delete initial style from currentBtn
    currentBtn.classList.remove("bg-gold", "text-darkPurple");
    //add the current style for the currentBtn
    currentBtn.classList.add("bg-darkPurple", "text-white");
  }

  function getCurrentBtnCategory(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (tracerOldValue != tracerNewValue) return;

    const currentTarget: HTMLButtonElement = e.currentTarget;
    const definedCategory: string | undefined = currentTarget.dataset.category;
    applyCurrentBtnStyle(e);
    if (!definedCategory) return;

    if (category === definedCategory) {
      resetPage("");
      // back to initial styles of category btn
      currentTarget.classList.remove("bg-darkPurple", "text-white");
      currentTarget.classList.add("bg-gold", "text-darkPurple");
      return;
    } else {
      resetPage(definedCategory);
    }
  }

  useEffect(() => {
    if (searchbarQueryValueExist) {
      const btns = document.querySelectorAll(".category__btn");
      applyInitialBtnStyles(btns);
    }
  }, [searchbarQueryValueExist]);

  return (
    <React.Fragment>
      <button
        data-category={dataCategory}
        onClick={(e) => {
          getCurrentBtnCategory(e);
        }}
        className="category__btn bg-gold  whitespace-nowrap font-semibold text-base text-darkPurple cursor-[inherit] px-4 py-0"
      >
        {criterionName}
      </button>
    </React.Fragment>
  );
};

export default PostFilterItemsBtn;
