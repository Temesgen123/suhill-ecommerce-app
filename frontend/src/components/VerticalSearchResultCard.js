import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

function VerticalSearchResultCard({ loading, data = [] }) {
  const loadingList = new Array(12).fill(null);
  const context = useContext(Context);
  const { fetchUserCartItemsCount } = context;
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    await fetchUserCartItemsCount();
  }; 

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,320px))] justify-center md:justify-between md:gap-5 overflow-scroll scrollbar-none transition-all">
      {loading
        ? loadingList.map((product, index) => {
            return (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[300px]   max-w-[280px] md:max-w-[300px] h-36 bg-white rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse">
                  {/* <img
                    src={product.productImage[0]}
                    alt=""
                    className="object-s cale-down h-full hover:scale-150 transition-all"
                  /> */}
                </div>
                <div className="p-4 grid w-full gap-2">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full">
                    {''}
                  </h2>
                  <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                  <div className="flex gap-3 text-xs ">
                    <p className="font-medium text-red-600 p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                  </div>
                  <button className="text-white text-sm rounded-full px-3 py-0.5 w-full bg-slate-200 animate-pulse"></button>
                </div>
              </div>
            );
          })
        : data.map((product, index) => {
            return (
              <Link
                to={'/product/' + product?._id}
                key={index + product?.productName + product?._id}
                className="w-full min-w-[280px] md:min-w-[300px]   max-w-[280px] md:max-w-[300px] h-36 bg-white rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]
                max-w-[125px] md:max-w-[165px]">
                  <img
                    src={product.productImage[0]}
                    alt=""
                   className="object-scale-down h-full hover:scale-110  transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3 text-xs">
                    <p className="font-medium text-red-600">{`EBT ${(product?.sellingPrice).toFixed(
                      2
                    )}`}</p>
                    <p className="text-slate-500 line-through">{`EBT ${(product?.price).toFixed(
                      2
                    )}`}</p>
                  </div>
                  <button
                    className="text-white text-sm bg-blue-900 hover:bg-red-700 rounded-full px-3 py-0.5 "
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
}

export default VerticalSearchResultCard;
