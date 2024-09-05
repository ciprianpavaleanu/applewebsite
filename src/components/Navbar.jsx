import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { appleImg } from "../utils";
import { enablePageScroll, disablePageScroll } from "scroll-lock";
import { Link } from "react-scroll";
import { navLists } from "../constants";

const Navbar = () => {
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    setOpenNavigation((prev) => !prev);
    if (!openNavigation) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpenNavigation(false);
        enablePageScroll();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center fixed top-0 bg-black z-50">
      <nav className="flex w-full items-center justify-between mx-4">
        <img src={appleImg} alt="Apple" width={14} height={18} />

        <div className="flex flex-1 justify-center max-md:hidden">
          {navLists.map(({ name, id }) => (
            <Link
              key={id}
              to={id}
              smooth={true}
              duration={500}
              offset={id === "iphone" ? 75 : 0}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
            >
              {name}
            </Link>
          ))}
        </div>

        <div className="md:hidden flex items-center relative z-50">
          <button onClick={toggleNavigation}>
            {openNavigation ? (
              <FiX size={24} className="text-white" />
            ) : (
              <FiMenu size={24} className="text-white" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`${
          openNavigation ? "block" : "hidden"
        } fixed top-0 left-0 w-full h-screen bg-zinc opacity-[0.97] text-white flex flex-col items-center justify-center z-10`}
      >
        {navLists.map(({ name, id }) => (
          <Link
            key={id}
            to={id}
            smooth={true}
            duration={500}
            className="py-4 text-xl cursor-pointer hover:text-gray-400 transition-all"
            onClick={() => {
              setOpenNavigation(false);
              enablePageScroll();
            }}
          >
            {name}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
