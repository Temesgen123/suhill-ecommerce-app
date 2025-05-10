//Product Banner
import React, { useEffect, useState } from 'react';

import image1 from '../asset/banner/banner-medium01.png';
import image2 from '../asset/banner/banner-medium02.png';
import image3 from '../asset/banner/banner-medium03.png';
import image4 from '../asset/banner/banner-medium04.png';
import image5 from '../asset/banner/banner-medium05.png';

import image1Mobile from '../asset/banner/banner-mobile01.png';
import image2Mobile from '../asset/banner/banner-mobile02.png';
import image3Mobile from '../asset/banner/banner-mobile03.png';
import image4Mobile from '../asset/banner/banner-small04.png';
import image5Mobile from '../asset/banner/banner-small05.png';

import { FaAngleRight } from 'react-icons/fa6';
import { FaAngleLeft } from 'react-icons/fa6';

const ProductBanner = () => {
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];
  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const preveousImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => {
        return prev - 1;
      });
    }
  };
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage((prev) => 0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);
  return (
    <div className="container px-4 mx-auto rounded overflow-hidden p-2">
      <div className=" h-60 md:h-80 w-full  relative">
        <div className="absolute z-10 h-full w-full text-xl hidden md:flex">
          <div className="flex justify-between items-center w-full h-full ">
            <button
              className="rounded-full bg-white shadow-md p-1"
              onClick={preveousImage}
            >
              <FaAngleLeft />
            </button>
            <button
              className="rounded-full bg-white shadow-md p-1"
              onClick={nextImage}
            >
              <FaAngleRight />
            </button>{' '}
          </div>
        </div>
        {/* Desktop and tablet version */}
        <div className="w-full h-full hidden md:flex overflow-hidden">
          {desktopImages.map((imageUrl, index) => {
            return (
              <div
                key={imageUrl}
                className="w-full h-full min-w-full min-h-full translate transition-all"
                style={{ transform: `translateX(${currentImage * -100}%)` }}
              >
                <img src={imageUrl} alt="bannerImg" className="w-full h-full" />
              </div>
            );
          })}
        </div>

        {/* Mobile version */}
        <div className="w-full h-full flex overflow-hidden md:hidden">
          {mobileImages.map((imageUrl, index) => {
            return (
              <div
                key={imageUrl}
                className="w-full h-full min-w-full min-h-full translate transition-all"
                style={{ transform: `translateX(${currentImage * -100}%)` }}
              >
                <img
                  src={imageUrl}
                  alt="bannerImg"
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
