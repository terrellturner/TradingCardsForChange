import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <nav className="flex flex-row items-center justify-between font-bold text-white h-24 bg-hops-green">
        <div className="group text-ipa-beige font-serif text-4xl text-center pl-4">
          <div className="h-10 w-8 bg-white">TC4C</div>
          </div>
        <div>
        </div>
        <div className="hidden h-full md:flex items-center md:space-x-8 text-[#ffffff] md:mr-4 justify-center">
          <div className="group">
            <a href="#">Events</a>
            <div className="group-hover:border-b group-hover:border-white w-full"></div>
          </div>
          <div className="group">
            <a href="#">About</a>
            <div className="group-hover:border-b group-hover:border-white w-full"></div>
          </div>
          <div className="group">
            <FaShoppingCart className="inline-block m-1"/>
            <a href="#">Cart</a>
            <div className="group-hover:border-b group-hover:border-white w-full"></div>
          </div>
          <div className="group">
            <FaUser className="inline-block m-1"/>
            <a href="#">Profile</a>
            <div className="group-hover:border-b group-hover:border-white w-full"></div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
