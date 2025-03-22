//Product Card

import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import AdminEditProduct from './AdminEditProduct';

const AdminProductCard = ({ productData, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white rounded p-4 mx-5 shadow-md hover:shadow-2xl transition-all">
      <div className="min-h-56 h-54 m-2 min-w-36 max-w-40">
        <div className="flex w-32  justify-center items-center "> 
          {/* w-32 h-32 */}
          <img
            src={productData?.productImage[0]}
            alt="product"
            className="mx-auto object-fill h-full max-h-32 "
          />
        </div>
        <h1 className="capitalize text-ellipsis line-clamp-2">
          {productData.productName}
        </h1>
        <h1 className="capitalize text-ellipsis line-clamp-2">
         Category :  {productData.category}
        </h1>
        <div>
          <div className="text-red-600 font-semibold">
            <span className="text-blue-900 font-bold">{'Price : '}</span>
            {'$' + (productData.sellingPrice).toFixed(2)}
          </div>
          <div className="w-fit ml-auto bg-green-200 hover:bg-green-700 p-1 rounded-full hover:text-white cursor-pointer">
            <MdModeEditOutline onClick={() => setEditProduct(true)} />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          onClose={() => setEditProduct(false)}
          productData={productData}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};
export default AdminProductCard;
