//Cart Page
import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import { MdDelete } from 'react-icons/md';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const context = useContext(Context);
  const { fetchUserCartItemsCount } = context;
  const loadingCart = new Array(context?.cartProductsCount).fill(null);

  const fetchCartData = async () => {
    // setLoading(true);
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    });
    // setLoading(false);
    const responseData = await response.json();
    if (responseData?.success) {
      setData(responseData?.data);
    }
  };
  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });
    const responseData = await response.json();
    if (responseData?.success) {
      fetchCartData();
      setLoading(false);
    }
  };
  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchCartData();
        setLoading(false);
      }
    }
  };
  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await response.json();
    if (responseData?.success) {
      fetchCartData();
      fetchUserCartItemsCount();
      setLoading(false);
    }
  };
  const handleLoading = async () => {
    await fetchCartData();
  };
  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const handlePayment = async () => {
    const stripePromise = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLIC_KEY
    );
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ cartItems: data }),
    });
    const responseData = await response.json();
    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue?.quantity,
    0
  );
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr?.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto md:my-12 my-14 md:p-2">
      <p className='text-xl font-semibold px-2'>Cart Items List</p>
      <div className="text-center my-2 text-lg">
        {data?.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between ">
        {/* View Cart */}
        <div className="w-full max-w-3xl mx-5 ">
          {loading
            ? loadingCart.map((element) => {
                return (
                  <div
                    key={element + 'Add to cart loading'}
                    className="w-full bg-red-600 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  >
                    Cart Loading
                  </div>
                );
              })
            : data?.map((cartProduct, index) => {
                return (
                  <div
                    key={cartProduct?._id + 'Add to cart loading'}
                    className="w-full bg-white h-40 md:h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={cartProduct?.productId?.productImage[0]}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply "
                      />
                    </div>
                    <div className="px-4 py-2 relative ">
                      {/* delete product */}
                      <div
                        className="absolute right-0 text-red-600 text-lg rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer "
                        onClick={() => {
                          deleteCartProduct(cartProduct?._id);
                        }}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {cartProduct?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {cartProduct?.productId?.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-red-600 text-md font-medium">
                          Price : $
                          {(cartProduct?.productId?.sellingPrice)?.toFixed(2)}
                        </p>
                        <p className="text-slate-600 text-md font-semibold">
                          Subtotal Price : $
                          {(
                            cartProduct?.productId?.sellingPrice *
                            cartProduct?.quantity
                          ).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center mt-1 gap-2">
                        <button
                          className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white w-6 h-6 rounded flex  justify-center items-center"
                          onClick={() =>
                            decreaseQty(cartProduct?._id, cartProduct?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{cartProduct?.quantity}</span>
                        <button
                          onClick={() =>
                            increaseQty(cartProduct?._id, cartProduct?.quantity)
                          }
                          className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white w-6 h-6 rounded flex  justify-center items-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        {/* Summary */}
        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse">
                Total
              </div>
            ) : (
              <div className=" h-44 md:h-40 bg-white border border-slate-300 p-5 md:p-0 ">
                <h2 className="text-white bg-blue-900 px-5 py-2">Summary</h2>
                <div className="flex justify-between items-center px-5 py-1 gap-2">
                  <p>Quantity :</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex justify-between items-center px-5 py-1 gap-2">
                  <p className="text-black font-bold">Total Price :</p>
                  <p className="text-red-600 font-semibold">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
                  <div className='flex justify-center mt-2 ' >
                  <button
                  className="bg-blue-800 text-white px-2 py-1  hover:bg-blue-700 w-[50%] transition-all  rounded-full"
                  onClick={handlePayment}
                >
                  Pay
                </button>
              </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
