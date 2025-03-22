// Search Product Page

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalSearchResultCard from '../components/VerticalSearchResultCard';

const SearchProduct = () => {
  const locationObject = useLocation();
  const queryString = locationObject.search;
  const queryArray = queryString.split('=');
  const queryTerm = queryArray[1];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + queryString, {
      method: SummaryApi.searchProduct.method,
    });
    const responseData = await response.json();
    setLoading(false);
    setData(responseData?.data);
  };
  useEffect(() => {
    fetchProduct();
  }, [locationObject]);
  return (
    <div className="container mx-auto md:p-10 pt-12 pb-2 px-3">
      {loading && <p className="text-lg text-center">Loading...</p>}
      <p className='md:text-xl text-md font-semibold my-3 '> Search results for <span className='text-red-600 font-bold'>{ }"{queryTerm}"</span>:  {data.length} {} items.</p>
      {data.length === 0 && !loading && (
        <p className="text-lg text-center bg-white">No Product Found.</p>
      )}
      {
        data.length !== 0 && !loading && (        
            <VerticalSearchResultCard loading = {loading} data = {data} />                 
        )
      }
    </div>
  );
};

export default SearchProduct;
