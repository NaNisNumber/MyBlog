interface Props {
  searchbarQuery: string;
  setSearchbarQuery: React.Dispatch<React.SetStateAction<string>>;
  resetPage(category: string): void;
}

const Searchbar = ({ searchbarQuery, setSearchbarQuery, resetPage }: Props) => {
  return (
    <form>
      <input
        onChange={(e) => {
          resetPage("");
          setSearchbarQuery(e.target.value);
        }}
        name="queryPostsInput"
        placeholder="ex: minecraft"
        className="px-2 py-1 font-sans focus:outline-none focus:ring focus:ring-violet-300"
        value={searchbarQuery}
      ></input>
    </form>
  );
};

export default Searchbar;
