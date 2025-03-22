// Product Detail

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common/index';
import { FaStar } from 'react-icons/fa';
import { FaStarHalfAlt } from 'react-icons/fa';
import ProductDispalyInCategory from '../components/ProductDisplayInCategory';
import scrollTop from '../helpers/scrollTop';
import addToCart from '../helpers/addToCart';
import Context from '../context';
const ProductDetails = () => {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: '',
  });
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const productImagesList = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState('');
  const [zoomedImageCoordinate, setZoomedImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [imageZoomed, setImageZoomed] = useState(false);

  const { fetchUserCartItemsCount } = useContext(Context);

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ productId: params.id }),
    });
    setLoading(false);
    const responseData = await response.json();
    setData(responseData?.data);
    setActiveImage(responseData?.data?.productImage[0]);
  }, [params?.id]);
  useEffect(() => {
    fetchProductDetails();
    scrollTop();
  }, [fetchProductDetails]);
  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl);
  };
  const handleZoomedImage = useCallback((e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomedImageCoordinate({ x, y });
  }, []);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserCartItemsCount();
  };

  return (
    <div className="container mx-auto p-4 mt-8 md:mt-10">
      <div className="min-h-[200px] flex flex-col lg:flex-row w-full gap-4 p-2">
        {/* product image */}
        <div className="md:h-96 flex flex-col lg:flex-row-reverse md:gap-4">
          {loading ? (
            <div className="w-[200px] h-[200px] lg:w-96 lg:h-96 bg-slate-200">
              Loading...
            </div>
          ) : (
            <div className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] lg:w-96 lg:h-96 bg-slate-200 relative  mx-auto">
              <img
                src={activeImage}
                alt=""
                className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                onMouseMove={handleZoomedImage}
                onMouseEnter={() => setImageZoomed(true)}
                onMouseLeave={() => setImageZoomed(false)}
              />
              {/* Maginfied Image */}
              {imageZoomed && (
                <div
                  className="absolute hidden lg:block min-w-[500px] min-h-[400px] bg-slate-200 p-1 
              -right-[520px] top-0 overflow-hidden"
                >
                  <div
                    className="w-full h-full mix-blend-multiply min-w-[500px] min-h-[400px] scale-110"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomedImageCoordinate.x * 100}% ${
                        zoomedImageCoordinate.y * 100
                      }% `,
                    }}
                  ></div>
                </div>
              )}
            </div>
          )}
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {' '}
                {productImagesList?.map((element, index) => {
                  return (
                    <div
                      className="h-12 w-12 md:h-20 md:w-20 bg-slate-200 rounded animate-pulse"
                      key={'loadingImage' + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
                <div className='flex justify-center '>
                  <div className="flex gap-1 md:gap-2 lg:flex-col overflow-scroll scrollbar-none h-full w-fit">
                {' '}
                {data?.productImage?.map((imageUrl, index) => {
                  return (
                    <div
                      className="h-12 w-12 md:h-20 md:w-20 bg-slate-200 rounded m-1"
                      key={imageUrl}
                    >
                      <img
                        src={imageUrl}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imageUrl)}
                        onClick={() => handleMouseEnterProduct(imageUrl)}
                      />
                    </div>
                  );
                })}
              </div>
              </div>
            )}
          </div>
        </div>
        {/* product detail */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className=" text-slate-200 rounded-full animate-pulse px-5 py-2 text-center inline-block h-6  lg:h-8 w-full"></p>
            <h2 className="text-2xl lg:text-4xl font-semibold h-6 lg:h-8 bg-slate-200 animate-pulse w-full">
              {}
            </h2>
            <p className="capitalize text-slate-600 bg-slate-200 animate-pulse h-6 lg:h-8 min-w-[100px] w-full"></p>
            <div className="flex items-center bg-slate-200 gap-1 text-sm h-6 lg:h-8 w-full "></div>
            <div className=" flex items-center gap-4 text-md font-medium my-1 h-6 lg:h-8 animate-pulse w-full">
              <p className="bg-slate-200 w-full"></p>
              <p className="bg-slate-200 w-full"></p>
            </div>
            <div className="flex items-center gap-3 my-2 w-full">
              <button className="bg-slate-200 animate-pulse h-6 lg:h-8 rounded w-full"></button>
              <button className="bg-slate-200 animate-pulse h-6 lg:h-8 rounded w-full"></button>
            </div>
            <div className="w-full">
              <p className="bg-slate-200 animate-pulse h-6 lg:h-8 rounded my-1 w-full">
                {' '}
              </p>
              <p className="bg-slate-200 animate-pulse h-6 lg:h-8 rounded my-1 w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 rounded-full px-3 text-center inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-semibold">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-600">{data?.category}</p>
            <div className="flex items-center text-yellow-600 gap-1 text-sm">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <div className=" flex items-center gap-4 text-md font-medium my-1 ">
              <p className="text-red-600">
                Selling Price : ${Number(data?.sellingPrice).toFixed(2)}
              </p>
              <p className="text-slate-600 line-through">
                {' '}
                Price : ${Number(data?.price).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[100px] md:min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={(e) => {
                  handleAddToCart(e, data?._id);
                  navigate('/cart');
                }}
              >
                Buy
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[100px] md:min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add To Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 my-1 font-medium">Description : </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>
      {data?.category && (
        <ProductDispalyInCategory
          category={data?.category}
          heading={'Recommended Products'}
          fetchDetailData={fetchProductDetails}
        />
      )}
    </div>
  );
};

export default ProductDetails;
