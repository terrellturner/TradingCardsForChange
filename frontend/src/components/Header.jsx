import React from "react";
import Logo from '/images/logo.svg'

const Header = () => {
  return (
    <header>
      <nav className="flex flex-row items-center justify-between font-bold text-white h-24 bg-hops-green">
        <div className="group text-ipa-beige font-serif text-4xl text-center pl-4">
          <div className="h-10 w-8 bg-white">TC4C</div>
          </div>
        <div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
