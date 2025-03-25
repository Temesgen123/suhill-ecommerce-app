//Category Product

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import SummaryApi from '../common';
import VerticalCategorySearchResultCard from '../components/VerticalCategorySearchResultCard';

function CategoryProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const categorySearchUrl = new URLSearchParams(location.search);
  const categoryUrlListArray = categorySearchUrl.getAll('category');
  const categoryUrlListObject = {};

  categoryUrlListArray.forEach((el) => {
    categoryUrlListObject[el] = true;
  });

  const [selectedCategory, setSelectedCategory] = useState(
    categoryUrlListObject
  );

  const [filteredCategoryList, setFilteredCategoryList] =
    useState(categoryUrlListArray);
  const [sortBy, setSortBy] = useState('');

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ category: filteredCategoryList }),
    });
    const responseData = await response?.json();
    setData(responseData?.data || []);
    setLoading(false);
  };
  const handleSelectedCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectedCategory((prev) => {
      return { ...prev, [value]: checked };
    });
  };
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectedCategory)
      .map((categoryKeyName) => {
        if (selectedCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilteredCategoryList(arrayOfCategory);
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    navigate('/product-category?' + urlFormat.join(''));
  }, [selectedCategory, navigate]);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleSortByOnChange = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === 'asc') {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === 'dsc') {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  // useEffect(() => { }, [sortBy]);
  useEffect(() => {
    fetchData();
  }, [filteredCategoryList]);

  return (
    <div className="container mx-auto p-4 pt-12">
      {/* Desktop version */}
      <button
        className="cursor-pointer rounded  my-2 mt-5 md:mt-0"
        onClick={() => {
          handleOpenSidebar();
        }}
      >
        {!openSidebar ? (
          <div className="text-blue-900 bg-slate-300 w-48 text-lg font-semibold rounded-xl hover:bg-slate-100">
            <span className="">SELECT CATEGORY</span>
          </div>
        ) : (
          <div className="w-48 text-lg font-bold flex justify-end bg-slate-300 hover:bg-slate-100">
            <span className="bg-red-600 hover:bg-white hover:text-red-600 text-white  rounded block w-8">
              X
            </span>
          </div>
        )}
      </button>
      {openSidebar ? (
        <div className=" md:grid md:grid-cols-[200px,1fr] flex ">
          {/* left side */}
          <div className="bg-white mt-16 md:mt-12 md:block p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
            {/* Sort by */}
            <div className="">
              <h3 className="text-base uppercase font-medium text-slate-500 border-b  border-slate-300 pb-1">
                Sort by
              </h3>
              <form className="text-sm flex flex-col gap-2 py-2">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    value="asc"
                    checked={sortBy === 'asc'}
                    onChange={handleSortByOnChange}
                  />
                  <label>Price - Low to high</label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    value="dsc"
                    checked={sortBy === 'dsc'}
                    onChange={handleSortByOnChange}
                  />
                  <label>Price - High to Low</label>
                </div>
              </form>
            </div>
            {/* Filter by */}
            <div className="">
              <h3 className="text-base uppercase font-medium text-slate-500 border-b  border-slate-300 pb-1">
                Category
              </h3>
              <form className="text-sm flex flex-col gap-2 py-2">
                {productCategory.map((categoryName, index) => {
                  return (
                    <div
                      className="flex items-center gap-3"
                      key={index + categoryName}
                    >
                      <input
                        type="checkbox"
                        name="category"
                        id={categoryName?.value}
                        value={categoryName?.value}
                        checked={selectedCategory[categoryName?.value]}
                        onChange={handleSelectedCategory}
                      />
                      <label htmlFor={categoryName?.value}>
                        {categoryName?.label}
                      </label>
                    </div>
                  );
                })}
              </form>
            </div>
          </div>
          {/* right side */}
          <div className="w-full px-5 py-1">
            <p className="py-2 text-xl font-semibold">
              <span className="mx-2">Search Result :</span>
              {data.length}
              <span className="mx-1">items</span>
            </p>
            <div className="min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none">
              {data.length !== 0 && (
                <VerticalCategorySearchResultCard
                  data={data}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className=" md:grid md:grid-cols-[0,1fr] flex  ">
          {/* left side */}
          <div className="bg-white hidden md:block  p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
            {/* Sort by */}
            <div className="">
              <h3 className="text-base uppercase font-medium text-slate-500 border-b  border-slate-300 pb-1">
                Sort by
              </h3>
              <form className="text-sm flex flex-col gap-2 py-2">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    value="asc"
                    checked={sortBy === 'asc'}
                    onChange={handleSortByOnChange}
                  />
                  <label>Price - Low to high</label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    value="dsc"
                    checked={sortBy === 'dsc'}
                    onChange={handleSortByOnChange}
                  />
                  <label>Price - High to Low</label>
                </div>
              </form>
            </div>
            {/* Filter by */}
            <div className="">
              <h3 className="text-base uppercase font-medium text-slate-500 border-b  border-slate-300 pb-1">
                Category
              </h3>
              <form className="text-sm flex flex-col gap-2 py-2">
                {productCategory.map((categoryName, index) => {
                  return (
                    <div
                      className="flex items-center gap-3"
                      key={index + categoryName}
                    >
                      <input
                        type="checkbox"
                        name="category"
                        id={categoryName?.value}
                        value={categoryName?.value}
                        checked={selectedCategory[categoryName?.value]}
                        onChange={handleSelectedCategory}
                      />
                      <label htmlFor={categoryName?.value}>
                        {categoryName?.label}
                      </label>
                    </div>
                  );
                })}
              </form>
            </div>
          </div>

          {/* right side */}
          <div className="w-full px-5 py-1 ">
            <p className="py-1 text-xl font-semibold">
              <span className="mx-2">Search Result :</span>
              {data.length}
              <span className="mx-1">items</span>
            </p>
            <div className="min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll flex flex-col items-start md:grid scrollbar-none">
              {data.length !== 0 && (
                <VerticalCategorySearchResultCard
                  data={data}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryProduct;
