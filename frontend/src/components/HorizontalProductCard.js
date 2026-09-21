import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchProductCategoryWise from '../helpers/fetchProductcategoryWise';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalProductCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Start as true so it attempts to fetch immediately
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
        // Ensure we handle both direct array responses or wrapped .data objects safely
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
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
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
                key={'loading-' + index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                <div className="p-4 grid w-full gap-2">
                  <div className="bg-slate-200 h-5 animate-pulse rounded-full w-full"></div>
                  <div className="bg-slate-200 h-4 animate-pulse rounded-full w-1/2"></div>
                  <div className="flex gap-4 w-full">
                    <div className="bg-slate-200 h-4 animate-pulse rounded-full w-full"></div>
                    <div className="bg-slate-200 h-4 animate-pulse rounded-full w-full"></div>
                  </div>
                  <div className="bg-slate-200 h-7 animate-pulse rounded-full w-full"></div>
                </div>
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
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center">
                  <img
                    src={getSecureUrl(product?.productImage?.[0])}
                    alt={product?.productName}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid w-full">
                  <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-blue-900 text-sm">
                    {product?.category}
                  </p>
                  <div className="flex gap-4 items-center">
                    <p className="font-medium text-red-600">
                      ${product?.sellingPrice?.toFixed(2)}
                    </p>
                    <p className="text-slate-500 line-through text-sm">
                      ${product?.price?.toFixed(2)}
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
          })
        )}
      </div>
    </div>
  );
};

export default HorizontalProductCard; // (Keep your export default syntax as it was)
