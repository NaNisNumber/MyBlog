import { useRef, useState, useEffect } from "react";
import PostFilterItemsBtn from "../buttons/PostFilterItemsBtn/PostFilterItemsBtn";
import { createClient } from "@sanity/client";
import { ReactElement } from "react";
interface Props {
  resetPage(category: string | undefined): void;
  setFrom: React.Dispatch<React.SetStateAction<number>>;
  setTo: React.Dispatch<React.SetStateAction<number>>;
  postRequestLimit: number;
  setCurrentPageId: React.Dispatch<React.SetStateAction<number>>;
  setPageDirection: React.Dispatch<React.SetStateAction<string>>;
  setReachedEnd: React.Dispatch<React.SetStateAction<boolean>>;
  category: string | undefined;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  searchbarQueryValueExist: boolean;
}
interface categories {
  title: string;
}

const TabsSelection = ({
  resetPage,
  isDragging,
  setIsDragging,
  category,
  searchbarQueryValueExist,
}: Props) => {
  const [categories, setCategories] = useState<categories[]>([]);
  const [tracerOldValue, setTracerOldValue] = useState<number>(0);
  const [tracerNewValue, setTracerNewValue] = useState<number>(0);
  const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: "production",
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: "2023-08-19", // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
  });

  // uses GROQ to query content: https://www.sanity.io/docs/groq

  // query for categories

  useEffect(() => {
    async function getCategories() {
      const categories = await client.fetch('*[_type == "category"]{title}');
      return categories;
    }

    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const filterTabsContainer = useRef<HTMLElement>(null);

  const searchCriterionBtns: ReactElement[] = categories.map(
    (criterionObj, i) => {
      const criterionName: string = criterionObj.title;

      return (
        <PostFilterItemsBtn
          resetPage={resetPage}
          category={category}
          dataCategory={criterionName}
          key={i}
          criterionName={criterionName}
          tracerOldValue={tracerOldValue}
          tracerNewValue={tracerNewValue}
          searchbarQueryValueExist={searchbarQueryValueExist}
        />
      );
    }
  );

  function slideToLeft(event: React.MouseEvent<HTMLButtonElement>) {
    if (!filterTabsContainer.current) return;
    filterTabsContainer.current.style.scrollBehavior = "smooth";
    filterTabsContainer.current.scrollLeft -= event.movementX + 90;
  }

  function slideToRight(event: React.MouseEvent<HTMLButtonElement>) {
    if (!filterTabsContainer.current) return;
    filterTabsContainer.current.style.scrollBehavior = "smooth";
    filterTabsContainer.current.scrollLeft -= event.movementX - 90;
  }

  // function draggingOnTouch(event: React.PointerEvent<HTMLDivElement>) {
  //   if (!filterTabsContainer.current) return;
  //   if (event.pointerType === "touch") {
  //     filterTabsContainer.current.style.scrollBehavior = "smooth";
  //     if (event.movementX > 0) {
  //       filterTabsContainer.current.scrollLeft -= event.movementX + 80;
  //     } else {
  //       filterTabsContainer.current.scrollLeft -= event.movementX - 80;
  //     }
  //   }
  // }

  function draggingWithMouse(event: React.PointerEvent<HTMLDivElement>) {
    /*
  THE PROBLEM: 
    when you drag the slider tabs, you also click a tab button that will trigger the handler after you release the click

  HOW IT SHOULD ACTUALLY WORK: 
    when you are dragging and you also hold or click a button, after you stop dragging that button should not trigger,
    unless it is triggered while the tabs are not dragged which means that the mouse should be on a steady and 
    non draggable position;

  WHAT I TRIED TO SOLVE IT:
    1.I tried to get the value of scrollLeft in real time and set it in a state every time the value changes.
    and if it changes that means the tabs div is being dragged => the button that was pressed at the same time while dragging
    should be innactive.
    This solved the problem but it is not the best way in terms of performance because there are a lot of changes in state
    while dragging.

    2.I tried to check if isDragging===true when onMouseDown was triggered and if it was true the buttons shouldn't work.
    But the problem in that was that when onMouseUp triggered isDragging===false => the buttons become active again and when
    the onClick function triggers at last it find that the isDragging is always false and the button will get active anyway.

   HOW I FINALLY SOLVED IT:
      I saved the initial value from scrollLeft with the onMouseDown event and I saved it as the old value, also the 
      end of the scrolling value from scrollLeft with the onMouseUp event. Those two values got saved in two different states
      then I received them as props in the PostFilterItemsBtn and on the onClick event I checked if those values were distinct
      and if they were that means the tabs container moved => the handler from onClick should not trigger.
      If you try to click once on a tab button without dragging the tabs container then the values will be the same and that means
      the container didn't move at all => the handler function from the onClick event will trigger.
  */
    if (!filterTabsContainer.current) return;
    if (event.pointerType === "mouse" && isDragging) {
      filterTabsContainer.current.style.scrollBehavior = "auto";
      filterTabsContainer.current.scrollLeft -= event.movementX;
    }
  }

  function draggingHandler(e: React.PointerEvent<HTMLDivElement>) {
    // draggingOnTouch(e);
    draggingWithMouse(e);
  }

  return (
    <div className="flex items-center w-2/3 font-sans ">
      <button className="w-fit cursor-pointer" onClick={(e) => slideToLeft(e)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#fff"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div
        onPointerMove={(e) => draggingHandler(e)}
        onMouseDown={() => {
          setIsDragging(true);
          if (!filterTabsContainer.current) return;
          filterTabsContainer.current.style.cursor = "grabbing";
          setTracerOldValue(filterTabsContainer.current.scrollLeft);
        }}
        onMouseUp={() => {
          setIsDragging(false);
          if (!filterTabsContainer.current) return;
          filterTabsContainer.current.style.cursor = "grab";
          setTracerNewValue(filterTabsContainer.current.scrollLeft);
        }}
        ref={filterTabsContainer as React.RefObject<HTMLDivElement>}
        className="flex gap-1 overflow-hidden"
      >
        {searchCriterionBtns}
      </div>
      <button className="w-fit cursor-pointer" onClick={(e) => slideToRight(e)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#fff"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default TabsSelection;
