import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../asset/signuplogo.png';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import imageToBase64 from '../helpers/imageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: '',
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const responseFetched = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const dataResponse = await responseFetched.json();
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        navigate('/login');
      }
      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } else {
      toast.error('Password does not match with confirmation password.');
    }
  };
  return (
    <section id="signup">
      <div className="container mx-auto p-4 mt-16 ">
        <div className="p-5 w-[90%] bg-gray-200 mx-auto max-w-lg rounded-lg shadow-md">
          <div className="h-16 w-16 mx-auto relative overflow-hidden rounded-full border-blue-700 border-[1px]">
            <div>
              <img
                src={data.profilePic || logo}
                alt="login icon"
                className="w-16"
              />
            </div>
            <form>
              <label>
                <div className="bg-slate-200 text-xs pb-[4px] leading-none text-center absolute bottom-0  cursor-pointer opacity-80 w-full">
                  Upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form className="p-5 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name: </label>
              <div className="bg-slate-100 p-2 rounded ">
                <input
                  type="text"
                  placeholder="Enter your user name."
                  name="username"
                  required
                  onChange={handleOnChange}
                  className=" rounded w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Email: </label>
              <div className="bg-slate-100 p-2 rounded ">
                <input
                  type="email"
                  placeholder="Enter your email."
                  name="email"
                  required
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
                  required
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
            </div>
            <div className="py-2">
              <label>Confirm Password: </label>
              <div className="bg-slate-100 p-2 rounded flex">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password."
                  name="confirmPassword"
                  required
                  onChange={handleOnChange}
                  className=" rounded w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {' '}
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-blue-900 text-white block w-full max-w-[150px] mx-auto px-4 py-1 rounded-full mt-2 hover:scale-110 hover:bg-blue-700 transition-all">
              Sign Up
            </button>
          </form>
          <p className="block  w-fit px-10 py-2  mb-5">
            Already have an account?{' '}
            <Link
              to={'/login'}
              className="text-blue-600 hover:text-red-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
