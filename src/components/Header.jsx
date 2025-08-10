import { useState } from "react";
// import logo3 from "../assets/logo3.png";
import logo2 from "../assets/logo2.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayCartItem from "./DisplayCartItem";

const Header = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openCartSection, setOpenCartSection] = useState(false);

  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const { totalPrice, totalQty } = useGlobalContext();

  const isSearchPage = location.pathname === "/search";

  const handleCloseUserMenu = () => setOpenUserMenu(false);

  const redirectToLoginPage = () => navigate("/login");

  const handleMobileUser = () => {
    if (!user?._id) {
      navigate("/login");
      return;
    }
    setOpenUserMenu((prev) => !prev);
  };

  return (
    <header className="h-24 py-2 lg:h-20 shadow-lg sticky top-0 z-40 flex flex-col 
    items-center justify-center gap-1 bg-white">
      {!(isMobile && isSearchPage) && (
        <div className="container mx-auto  flex items-center justify-between px-2">
          <div className="h-full">
            <Link to={"/"} className="flex justify-center items-center">
              <img
                className="ml-12 hidden lg:block"
                src={logo2}
                width={160}
                height={60}
                alt="logo"
              />
              <img
                className="lg:hidden"
                src={logo2}
                width={120}
                height={60}
                alt="logo"
              />
            </Link>
          </div>

          <div className="hidden lg:block">
            <Search />
          </div>

          <div>
            <button
              className="text-neutral-500 hover:text-neutral-700 lg:hidden"
              onClick={handleMobileUser}
            >
              <FaRegCircleUser size={30} />
            </button>

            {isMobile && openUserMenu && (
              <div className="absolute right-0 top-10 bg-white shadow-md rounded p-4
              min-w-52">
                <UserMenu close={handleCloseUserMenu} />
              </div>
            )}

            <div className="hidden lg:flex items-center gap-10 cursor-pointer">
              {user?._id ? (
                <div className="relative">
                  <div
                    className="flex items-center gap-2 select-none"
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                  >
                    <FaRegCircleUser size={25} />
                    <p className="text-lg">{user?.name}</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={20} />
                    ) : (
                      <GoTriangleDown size={20} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-10 bg-white shadow-md 
                    rounded p-4 min-w-52">
                      <UserMenu close={handleCloseUserMenu} />
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="text-lg px-2 cursor-pointer"
                >
                  Login
                </button>
              )}

              <button
                onClick={() => setOpenCartSection(true)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-800 
                px-3 py-3 rounded-lg text-white mr-6"
              >
                <div className="animate-bounce">
                  <BsCart4 size={30} />
                </div>
                <div className="font-semibold">
                  {cartItem[0] ? (
                    <div>
                      <p>{totalQty} Items</p>
                      <p>{DisplayPriceInRupees(totalPrice)}</p>
                    </div>
                  ) : (
                    <p>My Cart</p>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
      {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )}
    </header>
  );
};

export default Header;