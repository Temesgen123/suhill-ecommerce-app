//Header

import React, { useContext, useEffect, useState } from 'react';
import logo from '../logo.png';
import { GrSearch } from 'react-icons/gr';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';

const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const { cartProductsCount, fetchUserCartItemsCount } = useContext(Context);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const serachInput = useLocation();
  const queryString = serachInput?.search;

  const urlSearch = new URLSearchParams(queryString);
  const searchQuery = urlSearch.getAll('q');

  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.user_logout.url, {
      method: SummaryApi.user_logout.method,
      credentials: 'include',
    });
    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      toast.success(dataResponse.message);
      dispatch(setUserDetails(null));
      navigate('/');
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
      navigate('/');
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate('/search');
    }
  };

  useEffect(() => {
    fetchUserCartItemsCount();
  }, [cartProductsCount]);

  return (
    <header className=" md:h-24 h-28 shadow-md fixed w-full z-40 px-5 md:px-0 mx-auto">
      <div className="mx-auto md:px-4 md:p-3 px-1 ">
        <div className="mx-auto md:px-4 py-2 h-full  flex justify-between items-center ">
          <div className="md:px-2">
            <Link
              to="/"
              className="flex gap-2 items-center"
              onClick={() => {
                scrollTop();
              }}
            >
              <img src={logo} alt="logo" className="rounded-full md:h-10 h-8" />
              <p className="text-blue-800 md:text-xl text-lg font-bold">
                SUHILL
              </p>
            </Link>
          </div>
          <div className="hidden md:flex items-center w-full justify-between max-w-md border focus-within:shadow-md pl-5 rounded-full bg-transparent hover:border-1 hover:border-blue-700">
            <input
              type="text"
              placeholder="Search product here ..."
              className="w-full outline-none h-8 px-5 bg-transparent"
              onChange={handleSearch}
              value={search}
            />
            <div className="text-lg min-w-[50px] bg-[#021780] flex items-center h-8 justify-center rounded-r-full text-white cursor-pointer">
              <GrSearch />
            </div>
          </div>
          <div className="flex items-center md:gap-7 gap-2 bg-red-500">
            <div
              className="relative flex justify-center"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              {user?._id && (
                <div className="md:p-1 p-[2px] text-3xl cursor-pointer flex justify-center relative">
                  {user?.profilePic ? (
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src={user?.profilePic}
                        alt={user?.username}
                        className="md:w-8 md:h-8  w-7 h-7 rounded-full"
                      />
                      <p className="text-xs text-blue-900">{user.username}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center">
                      <FaRegUserCircle />
                      <p className="text-xs text-blue-900">{user.username}</p>
                    </div>
                  )}
                </div>
              )}
              {menuDisplay && (
                <div className="absolute bg-white bottom-0 top-[40px] h-fit p-2 shadow-md rounded hidden md:block">
                  <nav className="grid">
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to={'/admin-panel'}
                        // className="whitespace-nowrap hover:bg-slate-100 p-[5px] rounded "
                        className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      >
                        Admin Panel
                      </Link>
                    )}
                    {user?._id && (
                      <Link
                        to={'/order'}
                        className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      >
                        Order
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </div>
            {user?._id && (
              <Link
                to="/cart"
                className="p-1 text-2xl cursor-pointer relative "
              >
                <span>
                  <FaShoppingCart />
                </span>
                <div className="absolute -top-1 -right-2 w-4 h-4 p-1 flex bg-[#ff0000] justify-center items-center rounded-full  text-white ">
                  <p className="text-xs">{cartProductsCount}</p>
                </div>
              </Link>
            )}
            <div>
              {user?._id ? (
                <button
                  className="bg-blue-900 text-white md:px-3 px-1 pb-1 rounded-full hover:bg-slate-100 hover:text-blue-900  hover:border-2 border-blue-900 "
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="login"
                  className="bg-blue-900 text-white md:px-5 md:py-1 px-2  rounded-full hover:bg-slate-100 hover:text-blue-900  hover:border-2 border-blue-900 
                   "
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden items-center w-full border focus-within:shadow-md pl-5 rounded-full flex my-3 text-blue-900 bg-white mx-auto justify-center">
          <div className="flex rounded-full w-full">
            <input
              type="text "
              placeholder="Search product here ..."
              className="outline-none w-full  rounded-l-full px-10  h-7"
              onChange={handleSearch}
              value={search}
            />
            <div className="text-xl flex items-center h-7 rounded-r-full px-3 md:px-5 cursor-pointer bg-blue-900 text-white py-2 ">
              <GrSearch />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
