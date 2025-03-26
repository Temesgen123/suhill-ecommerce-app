import React from 'react';
import PAYMENTCANCELLEDIMAGE from '../asset/cancelled.png';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto bg-slate-300 p-5 my-5">
        <img src={PAYMENTCANCELLEDIMAGE} alt="" />
        <p className="text-2xl text-red-600 font-semibold text-center">
          Payment Cancelled.
        </p>
        <Link to={'/cart'}>
          <button className="text-center text-xl font-semibold text-red-600 border-red-600 border-2 hover:bg-red-600 hover:text-white py-1 px-3  block mx-auto my-4  rounded">
            Go To Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
