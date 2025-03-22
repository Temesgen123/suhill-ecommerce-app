//Category Pages

import React, { useEffect, useState } from 'react';
import SummaryAPI from '../common/index';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(12).fill(null);
  
  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryAPI.categoryProduct.url);
    const responseData = await response.json();
    setLoading(false);
    setCategoryProduct(responseData.data);
  };
  // const handleClick = async()=> {
  // fetchCategoryProduct();
  //  }
  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto md:p-4 md:pt-10 pt-12 pb-2">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading?.map((element, index) => {
              return (
                <div
                  key={index + 'categoryLoading'}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                >
                  {' '}
                </div>
              );
            })
          : categoryProduct?.map((product, index) => {
              return (
                <Link
                  to={'/product-category?category=' + product?.category}                  
                  className="cursor-pointer"
                  key={product?.productName + index}                 
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-full p-3 bg-slate-200 flex justify-center items-center">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-105 transition-all"
                    />
                  </div>
                  <p className="capitalize text-center text-sm md:text-base">
                    {product.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
