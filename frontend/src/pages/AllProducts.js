import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common/index';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchAllProduct = async () => {
    const fetchedResponse = await fetch(SummaryApi.allProduct.url, {
      method: SummaryApi.allProduct.method,
    });
    const responseData = await fetchedResponse.json();
    setProducts(responseData?.data);
  };

  const handleProductUpload = () => {
    setOpenUploadProduct(true);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className=''>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">All Products</h1>
        <button
          className="rounded-full border-2 border-blue-950 px-3 py-1 pb-1 hover:bg-blue-900 hover:text-white hover:scale-105 hover:shadow-md transition-all"
          onClick={handleProductUpload}
        >
          Upload Product
        </button>
      </div>
      {/*Upload Product Component */}      
      <div className="flex flex-wrap gap-5 items-center  py-4 h-[calc(100vh-200px)] bg-blue-50 overflow-y-scroll scrollbar-none">
        {products.map((product, index) => {
          return (
            <AdminProductCard
              productData={product}
              key={index + 'allproducts'}
              fetchData={fetchAllProduct}
            />
          );
        })}
      </div>      
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
