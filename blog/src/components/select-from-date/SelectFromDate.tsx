interface Props {
  resetPage(category: string): void;
  category: string;
  orderType: string;
  setOrderType: React.Dispatch<React.SetStateAction<string>>;
}

const SelectFromDate = ({
  resetPage,
  category,
  orderType,
  setOrderType,
}: Props) => {
  function defineOrderType(e: React.ChangeEvent<HTMLSelectElement>) {
    const targetValue: string = `${e.target.value}`;
    resetPage(category);
    setOrderType(targetValue);
  }

  return (
    <select
      className="border-none px-3 py-1 focus:outline-none cursor-pointer  font-sans"
      name="dates"
      id="dates"
      onChange={(e) => defineOrderType(e)}
      value={orderType}
    >
      <option className="bg-lightBlue text-white " value="desc">
        Newest
      </option>
      <option className="bg-lightBlue text-white " value="asc">
        Oldest
      </option>
    </select>
  );
};

export default SelectFromDate;
