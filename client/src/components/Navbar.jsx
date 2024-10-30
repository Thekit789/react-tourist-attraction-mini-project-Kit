export function NavBar({ inputSearch, setInputSearch }) {
  const handleChange = (event) => {
    setInputSearch(event.target.value);
  };

  return (
    <nav className="flex flex-col items-center">
      <h1 className="w-5/6 flex justify-start text-lg font-medium">
        ค้นหาที่เที่ยว
      </h1>
      <div className="w-full flex justify-center">
        <input
          className="w-5/6 h-12 text-center border-b-2 text-base font-bold focus:outline-none text-[#75716B]"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          value={inputSearch}
          onChange={handleChange}
        />
      </div>
    </nav>
  );
}
