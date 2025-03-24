// All Orders

import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';

const AllOrders = () => {
  const [data, setData] = useState([]);
  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.allOrders.url, {
      method: SummaryApi.allOrders.method,
      credentials: 'include',
    });
    const responseData = await response.json();
    console.log('OrderList :', responseData);
    setData(responseData?.data);
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  return (
    <div className="container mx-auto mt-12 p-5">
      {!data[0] && (
        <p className="font-semibold text-sm md:text-xl text-red-700 p-5">
          No orders in your name and account!
        </p>
      )}
      <div className="w-full mx-auto ">
        {data?.map((item, index) => {
          return (
            <div key={item.userId + index} className="md:mx-5">
              <p className="font-medium text-lg mt-2">
                Orders on {moment(item?.createdAt).format('LL')}
              </p>
              <div className="border border-slate-400 rounded ">
                <div className="flex flex-col lg:flex-row  justify-between ">
                  <div className="grid gap-1 w-full">
                    {item?.productDetails?.map((product, index) => {
                      return (
                        <div
                          key={product?.productId + index}
                          className="flex gap-3 bg-slate-100"
                        >
                          <div className="bg-slate-200">
                            <img
                              src={product?.image[0]}
                              alt=""
                              className="w-20 h-20 p-2  object-scale-down"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-lg text-ellipsis line-clamp-1">
                              {product.name}
                            </div>
                            <div className="flex items-center gap-5 mt-2">
                              <div className="text-red-600 text-lg  ">
                                Price : ${product?.price?.toFixed(2)}
                              </div>
                              <div>Quantity : {product?.quantity}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col p-3 md:min-w-[300px] gap-2 md:gap-4">
                    <div>
                      <div className="text-lg font-medium">
                        Payment Details :
                      </div>
                      <p className="ml-1 ">
                        Payment method :{' '}
                        {item?.paymentDetails?.payment_method_type[0]}
                      </p>
                      <p className=" ml-1 ">
                        Payment Status :{item?.paymentDetails?.payment_status}{' '}
                      </p>
                    </div>
                    <div>
                      <div className="text-lg font-medium">
                        Shipping Details :{' '}
                      </div>

                      {item?.shipping_options?.map((shipping, index) => {
                        return (
                          <div
                            key={shipping.shipping_rate + index}
                            className="ml-1"
                          >
                            Shipping Amount :{' '}
                            {shipping?.shipping_amount?.toFixed(2) / 100}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="font-semibold ml-auto lg:text-lg w-fit text-red-600">
                  <span className="text-black ">Total Amount :</span>$
                  {item?.totalAmount?.toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllOrders;
