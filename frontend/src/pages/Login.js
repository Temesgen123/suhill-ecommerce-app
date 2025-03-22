//Login Page

import React, { useContext, useState } from 'react';
import logo from '../asset/loginlogo.png';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserCartItemsCount } = useContext(Context);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const apiResponse = await responseData.json();
    if (apiResponse.success) {
      toast.success(apiResponse.message);
      fetchUserDetails();
      fetchUserCartItemsCount();
      navigate('/');
    }
    if (apiResponse.error) {
      toast.error(apiResponse.message);
    }
  };
  return (
    <section id="login">
      <div className="container mx-auto mt-20 ">
        <div className="md:p-8 p-2 w-[90%] bg-gray-200 md:max-w-lg mx-auto rounded-md shadow-md">
          <div>
            <img
              src={logo}
              alt="login icon"
              className="rounded-full mx-auto w-16"
            />
          </div>
          <form className="p-5 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email: </label>
              <div className="bg-slate-100 p-2 rounded ">
                <input
                  type="email"
                  placeholder="Enter your email."
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className=" rounded w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="py-2">
              <label>Password: </label>
              <div className="bg-slate-100 p-2 rounded flex">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password."
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className=" rounded w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span> {showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={'/forgot-password'}
                className="block ml-auto w-fit p-2 text-blue-600 hover:text-red-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button className="bg-blue-900 text-white block w-full max-w-[150px] mx-auto px-4 py-1 rounded-full mt-2 hover:scale-110 hover:bg-blue-700 transition-all">
              Login
            </button>
          </form>
          <p className="block  w-fit px-10 py-2  mb-5">
            Don't have an account?{' '}
            <Link
              to={'/sign-up'}
              className="text-blue-600 hover:text-red-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
