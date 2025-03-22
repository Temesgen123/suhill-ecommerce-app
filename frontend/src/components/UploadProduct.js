import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from 'react-icons/fa';
import uploadImage from '../helpers/uploadProductImage';
import DisplayImageFullSize from './DisplayImageFullSize';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({ onClose, fetchAllProduct}) => {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: '',
  });
  const [uploadProductImageInput, setUploadProductImageInput] = useState('');
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState('');
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    setUploadProductImageInput(file.name);
    console.log('File : ', file);
    const uploadedImageToCloudinary = await uploadImage(file);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadedImageToCloudinary.url],
      };
    });
    console.log('Uploaded image : ', uploadedImageToCloudinary);
  };
  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchedResponse = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await fetchedResponse.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      fetchAllProduct();
      onClose();    
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };
  return (
    <div className=" fixed w-full h-full top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-slate-200 bg-opacity-40 ">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-lg">Upload Product</h1>
          <div className="" onClick={onClose}>
            <CgClose className="size-7 border text-red-500 bg-slate-200 rounded hover:text-white hover:bg-red-600 transition-all cursor-pointer" />
          </div>
        </div>
        <form
          className="grid p-5 gap-2 overflow-y-scroll h-full"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName" className="mt-3">
            Product Name :
          </label>
          <input
            type="text"
            id="productName"
            placeholder="  Enter Product Name. "
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="rounded bg-slate-100 w-full p-2 "
            required
          />

          <label htmlFor="productBrand" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="  Enter Brand Name. "
            name="brandName"
            value={data.brandName}
            onChange={handleOnChange}
            className="rounded bg-slate-100 w-full p-2 "
            required
          />
          <label htmlFor="category" className="mt-3">
            Category :
          </label>
          <select
            className="bg-slate-100 p-1 rounded"
            id="category"
            name="category"
            value={data.category}
            onChange={handleOnChange}
            required
          >
            <option value="" className="bg-slate-100">
              Select Category
            </option>
            {productCategory.map((elemet, index) => {
              return (
                <option
                  key={elemet.value + index}
                  value={elemet.value}
                  className="bg-slate-100"
                >
                  {elemet.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage">Product Image : </label>
          <label htmlFor="uploadImageInput">
            <div className="bg-slate-100 p-2 border rounded w-full h-32 flex justify-center items-center cursor-pointer">
              <div className=" text-slate-500 flex flex-col gap-2 justify-center items-center">
                <FaCloudUploadAlt size={64} className="text-slate-400" />
                <p className="text-sm">Uopload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div className="flex gap-2 items-center">
            {data?.productImage[0] ? (
              data.productImage.map((elemet, index) => {
                return (
                  <div className="relative group" key={index + elemet}>
                    <img
                      src={elemet}
                      alt={elemet}
                      width={80}
                      height={80}
                      className="bg-slate-100 border cursor-pointer"
                      onClick={() => {
                        setFullScreenImage(elemet);
                        setOpenFullScreenImage(true);
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 bg-red-600 text-white p-1 rounded-full hidden group-hover:block cursor-pointer"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-red-600 text-sm flex justify-center items-center pb-10">
                Please, upload product image.
              </p>
            )}
          </div>
          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            placeholder="  Enter Price. "
            name="price"
            value={data.price}
            onChange={handleOnChange}
            className="rounded bg-slate-100 w-full p-2 "
            required
          />
          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price :
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="  Enter Selling Price. "
            name="sellingPrice"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="rounded bg-slate-100 w-full p-2 "
            required
          />

          <label htmlFor="description" className="mt-3">
            Product Description :
          </label>
          <textarea
            rows={3}
            placeholder="Enter Product Description. "
            className="bg-slate-100 border h-28 resize-none p-1 mb-5"
            type="text"
            id="description"
            name="description"
            value={data.description}
            onChange={handleOnChange}
          ></textarea>
          <button className="py-1 px-3 bg-blue-900 text-white w-full max-w-64 rounded-full mx-auto mb-12 hover:bg-blue-600 hover:scale-105 transition-all">
            Upload Product
          </button>
        </form>
      </div>
      {/* Dispaly image full screen. */}
      {openFullScreenImage && (
        <DisplayImageFullSize
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};
export default UploadProduct;
