//App JS

import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartProductsCount, setCartProductsCount] = useState(0);

  const fetchUserDetails = useCallback(async () => {
    const apiResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });
    const apiData = await apiResponse.json();
    if (apiData.success) {
      dispatch(setUserDetails(apiData.data));
    }
  }, []);
  const fetchUserCartItemsCount = async () => {
    const apiResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include',
    });
    const apiData = await apiResponse.json();
    setCartProductsCount(() => apiData?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserCartItemsCount();
  }, [cartProductsCount, fetchUserDetails]);
  return (
    <>
      <Context.Provider
        value={{ fetchUserDetails, cartProductsCount, fetchUserCartItemsCount }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-80px)] mx-auto pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
