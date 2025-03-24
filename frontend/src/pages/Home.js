import React from 'react';
import CategoryList from '../components/CategoryList';
import ProductBanner from '../components/ProductBanner';
import HorizontalProductCard from '../components/HorizontalProductCard';
import VerticalProductCard from '../components/VerticalProductCard';

const Home = () => {
  return (
    <div className="container mx-auto p-4 ">
      <CategoryList />
      <ProductBanner />
      <HorizontalProductCard category={'laptops'} heading={'Top Laptops'} />
      <HorizontalProductCard category={'mobiles'} heading={'Top Mobiles'} />
      <HorizontalProductCard category={'watches'} heading={'Top Watches'} />
      <VerticalProductCard
        category={'desktops'}
        heading={'Top Desktops Computers'}
      />
      <HorizontalProductCard category={'camera'} heading={'Top Cameras'} />
      <HorizontalProductCard category={'guitars'} heading={'Top Guitars'} />
      <VerticalProductCard
        category={'monitors'}
        heading={'Top Computer Monitors'}
      />
      <HorizontalProductCard category={'printers'} heading={'Top Printers'} />
      <HorizontalProductCard category={'mouse'} heading={'Top Mouse'} />
      <VerticalProductCard
        category={'televisions'}
        heading={'Top Televisions'}
      />
    </div>
  );
};

export default Home;
