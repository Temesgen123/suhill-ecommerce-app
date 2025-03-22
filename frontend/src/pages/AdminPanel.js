import React, { useEffect } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role !== ROLE.ADMIN){
      navigate('/');
    }
  }, [user]);
  return (
    <div className="min-h-[calc(100vh-150px)] md:flex hidden mt-12 ">
      <aside className="min-h-full w-full max-w-60 asideCustomShadow">
        <div className="h-32 flex flex-col justify-center items-center">
          <div className="text-5xl cursor-pointer relative flex justify-center mt-12">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <FaRegUserCircle />
            )}
          </div>
          {user?.username && <p className="capitalize font-semibold text-lg">{` ${user?.username}`}</p>}
          {user?.role && <p className="text-xs">{`Role : ${user?.role}`}</p>}
        </div>
        <div>
          <nav className="grid p-5">
            <Link to={'all-users'} className="px-2 py-1  hover:bg-slate-100 hover:text-blue-900">
              All users
            </Link>
            <Link to={'all-products'} className="px-2 py-1 hover:bg-slate-100 hover:text-blue-900">
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
