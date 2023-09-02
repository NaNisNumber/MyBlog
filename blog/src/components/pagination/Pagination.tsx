interface Props {
  fetchPageHandler(page: string): void;
  currentPageId: string | number;
}

const Pagination = ({ currentPageId, fetchPageHandler }: Props) => {
  return (
    <div className="flex gap-2 flex-col items-center">
      <div className="text-darkPurple font-semibold flex items-center gap-3 font-sans">
        <button
          onClick={() => fetchPageHandler("prev")}
          className="bg-lightBlue py-1 px-3"
        >
          prev
        </button>
        <div>
          <span className="text-white">{currentPageId}</span>
        </div>
        <button
          onClick={() => fetchPageHandler("next")}
          className="bg-lightBlue py-1 px-3"
        >
          next
        </button>
      </div>
      <p className="text-white">(total results: 100)</p>
    </div>
  );
};

export default Pagination;
