import React from 'react';
import SUCCESSIMAGE from '../asset/paid.png';
import {Link} from 'react-router-dom'

const Success = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto bg-slate-300 p-5 my-5">
        <img src={SUCCESSIMAGE} alt="" />
        <p className="text-2xl text-green-600 font-semibold text-center">
          Payment Made Successfully.
        </p>
        <Link to={'/order'} >
        <button  className="text-center text-xl font-semibold text-green-600 border-green-600 border-2 hover:bg-green-600 hover:text-white py-1 px-3  block mx-auto my-4  rounded">
          Go To Order Page
        </button>        
        </Link>       
      </div>
    </div>
  );
};

export default Success;
