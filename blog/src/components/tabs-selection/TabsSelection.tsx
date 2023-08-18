import { useRef } from "react";
import { searchCriteriaData } from "./searchCriteriaData";
import PostFilterItemsBtn from "../buttons/PostFilterItemsBtn/PostFilterItemsBtn";

interface Props {
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

const TabsSelection = ({ isDragging, setIsDragging }: Props) => {
  const filterTabsContainer = useRef<HTMLElement>(null);
  const searchCriterionBtns = searchCriteriaData.map((criterionObj, i) => {
    const criterionName: string = criterionObj.criterionName;
    return <PostFilterItemsBtn key={i} criterionName={criterionName} />;
  });

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

  function draggingOnTouch(event: React.PointerEvent<HTMLDivElement>) {
    if (!filterTabsContainer.current) return;

    if (event.pointerType === "touch") {
      filterTabsContainer.current.style.scrollBehavior = "smooth";
      if (event.movementX >= 0) {
        filterTabsContainer.current.scrollLeft -= event.movementX + 80;
      } else {
        filterTabsContainer.current.scrollLeft -= event.movementX - 80;
      }
    }
  }

  function draggingWithMouse(event: React.PointerEvent<HTMLDivElement>) {
    if (!filterTabsContainer.current) return;
    if (event.pointerType === "mouse" && isDragging) {
      filterTabsContainer.current.style.scrollBehavior = "auto";
      filterTabsContainer.current.scrollLeft -= event.movementX;
    }
  }

  function draggingHandler(e: React.PointerEvent<HTMLDivElement>) {
    draggingOnTouch(e);
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
        }}
        onMouseUp={() => {
          if (!filterTabsContainer.current) return;
          filterTabsContainer.current.style.cursor = "grab";
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
