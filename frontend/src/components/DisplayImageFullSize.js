//Dispaly Full Size Product Image

import React from 'react';
import { CgClose } from 'react-icons/cg';

const DisplayImageFullSize = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded mx-auto max-w-5xl p-4">
        <div
          className="w-fit ml-auto  text-red-500 text-2xl cursor-pointer hover:bg-red-600 hover:text-white"
          onClick={onClose}
        >
          <CgClose />
        </div>
        <div className="p-4 flex flex-col justify-center max-w-[80vw] max-h-[80vh] items-center">
          <img src={imgUrl} alt="" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImageFullSize;
