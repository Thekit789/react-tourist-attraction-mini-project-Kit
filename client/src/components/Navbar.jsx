export function NavBar() {
  return (
    <nav className="flex flex-col items-center">
      <h1 className="w-5/6 flex justify-start">ค้นหาเที่ยว</h1>
      <div className="w-full flex justify-center">
        <input
          className="w-5/6 text-center border-b-2 text-base font-bold text-[#75716B]"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
        />
      </div>
    </nav>
  );
}
