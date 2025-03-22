import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchProductCategoryWise from '../helpers/fetchProductcategoryWise';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const VerticalProductCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(12).fill(null);

  // const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserCartItemsCount } = useContext(Context);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchProductCategoryWise(category);
    setData(categoryProduct?.data);
    setLoading(false);
  };

  const handleAddToCart = async (e, id) => {
    addToCart(e, id);
    fetchData();
    fetchUserCartItemsCount();
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);
  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  return (
    <div className="container mx-auto px-4 my-5 relative ">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="rounded-full bg-white shadow-md p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="rounded-full bg-white shadow-md p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>{' '}
        {loading
          ? loadingList?.map((product, index) => {
              return (
                <div
                  key={index + product?.productName + product?._id}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md "
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                  <div className="p-4 grid gap-2">
                    <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 p-1 py-2 animate-pulse bg-slate-200 text-black">
                      {''}
                    </h2>
                    <p className="capitalize text-yellow-600 p-1 animate-pulse bg-slate-200 py-2">
                      {' '}
                    </p>
                    <div className="flex gap-4">
                      <p className="font-medium text-red-600 p-1 animate-pulse bg-slate-200 w-full py-2"></p>
                      <p className="text-slate-500 line-through p-1 animate-pulse bg-slate-200 w-full py-2"></p>
                    </div>
                    <button className=" rounded-full px-3  text-white hover:scale-105 transition-all text-sm bg-slate-200 py-2"></button>
                  </div>
                </div>
              );
            })
          : data?.map((product, index) => {
              return (
                <Link
                  to={'product/' + product?._id}
                  key={index + product?.productName + product?._id}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md "
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                    <img
                      src={product?.productImage[0]}
                      alt="productimg"
                      className="object-scale-down h-full hover:scale-110  transition-all mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid gap-2">
                    <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-yellow-600">
                      {' '}
                      {product?.category}
                    </p>
                    <div className="flex gap-4">
                      <p className="font-medium text-red-600">
                        ${(product?.sellingPrice).toFixed(2)}
                      </p>
                      <p className="text-slate-500 line-through">
                        ${(product?.price).toFixed(2)}
                      </p>
                    </div>
                    <button
                      className="bg-blue-700 rounded-full px-3 py-1 text-white hover:bg-red-700 hover:scale-105 transition-all text-sm"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalProductCard;
