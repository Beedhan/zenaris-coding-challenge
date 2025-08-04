import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f4] px-10 py-3">
      <div className="flex items-center gap-4 text-[#121417]">
        <h2 className="text-[#121417] text-lg font-bold leading-tight tracking-[-0.015em]">
          Zenaris
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a
            className="text-[#121417] text-sm font-medium leading-normal"
            href="#"
          >
            Dashboard
          </a>
          <a
            className="text-[#121417] text-sm font-medium leading-normal"
            href="#"
          >
            Meals
          </a>
          <a
            className="text-[#121417] text-sm font-medium leading-normal"
            href="#"
          >
            Reports
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
