const SelectFromDate = () => {
  return (
    <select
      className="border-none px-3 py-1 focus:outline-none focus:ring focus:ring-violet-300 font-sans"
      name="cars"
      id="cars"
    >
      <option className="bg-lightBlue text-white " value="volvo">
        Newest
      </option>
      <option className="bg-lightBlue text-white " value="saab">
        Oldest
      </option>
    </select>
  );
};

export default SelectFromDate;
