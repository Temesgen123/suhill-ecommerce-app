import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchProductCategoryWise from '../helpers/fetchProductcategoryWise';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const VerticalProductCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(12).fill(null);

  const scrollElement = useRef();
  const { fetchUserCartItemsCount } = useContext(Context);

  const getSecureUrl = (url) => {
    if (!url) return '';
    return url.replace('http://', 'https://');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoryProduct = await fetchProductCategoryWise(category);
        const productArray = Array.isArray(categoryProduct)
          ? categoryProduct
          : categoryProduct?.data || [];

        setData(productArray);
      } catch (error) {
        console.error(
          'Failed to fetch products for category:',
          category,
          error,
        );
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchData();
    }
  }, [category]);

  const handleAddToCart = async (e, id) => {
    e.preventDefault(); // Prevent Link navigation when clicking "Add To Cart"
    await addToCart(e, id);
    fetchUserCartItemsCount();
  };

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-5 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="rounded-full bg-white shadow-md p-1 absolute left-0 text-lg hidden md:block z-10"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="rounded-full bg-white shadow-md p-1 absolute right-0 text-lg hidden md:block z-10"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading ? (
          loadingList.map((_, index) => {
            return (
              <div
                key={'loading-vertical-' + index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md p-4 flex flex-col gap-2"
              >
                <div className="bg-slate-200 h-48 w-full animate-pulse rounded-sm"></div>
                <div className="bg-slate-200 h-5 animate-pulse rounded-full w-full"></div>
                <div className="bg-slate-200 h-4 animate-pulse rounded-full w-1/2"></div>
                <div className="flex gap-4 w-full">
                  <div className="bg-slate-200 h-4 animate-pulse rounded-full w-full"></div>
                  <div className="bg-slate-200 h-4 animate-pulse rounded-full w-full"></div>
                </div>
                <div className="bg-slate-200 h-8 animate-pulse rounded-full w-full"></div>
              </div>
            );
          })
        ) : data.length === 0 ? (
          <p className="text-slate-500 py-4">
            No products found for {category}
          </p>
        ) : (
          data.map((product, index) => {
            return (
              <Link
                to={'/product/' + product?._id}
                key={product?._id || index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="bg-slate-200 h-48 w-full p-4 flex items-center justify-center rounded-sm">
                    <img
                      src={getSecureUrl(product?.productImage?.[0])}
                      alt={product?.productName}
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    />
                  </div>
                  <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black mt-2">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-blue-900 text-sm">
                    {product?.category}
                  </p>
                  <div className="flex gap-4 items-center my-1">
                    <p className="font-medium text-red-600">
                      ${product?.sellingPrice?.toFixed(2)}
                    </p>
                    <p className="text-slate-500 line-through text-sm">
                      ${product?.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-blue-700 rounded-full px-3 py-1 text-white hover:bg-red-700 hover:scale-105 transition-all text-sm w-full mt-2"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add To Cart
                </button>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VerticalProductCard;
