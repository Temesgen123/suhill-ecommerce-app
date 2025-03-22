import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from 'react-icons/io';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({userId, username, email, role, onClose, callFunction }) => {
  const [userRole, setUserRole] = useState(role);
  const handleSelectionChange = (e) => {
    setUserRole(e.target.value);
  };
  const updateUserRole = async () => {
    const fetchUpdatedRole = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ role: userRole, userId : userId}),
    });
    const updateResponse = await fetchUpdatedRole.json();
    if(updateResponse.success){
      toast.success(updateResponse.message);
      callFunction();
      onClose();
    }
    if(updateResponse.error){
      toast.error(updateResponse.message);
      callFunction();
      onClose();
    }
  };  
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0  w-full h-full z-10 flex justify-between items-center bg-slate-300 bg-opacity-40" >
      <div className="mx-auto bg-white shadow-md w-full max-w-sm p-4 rounded-md">
        <button className="block ml-auto "onClick={onClose}>
          <span className="hover:text-white hover:bg-red-600 bg-slate-200 text-red-500 inline-block rounded-md">
            <IoMdClose className="size-7 border" />
          </span>
        </button>
        <h1 className="font-medium text-lg pb-4">Change User Role</h1>
        <p>Name : {username}</p>
        <p>Email : {email}</p>
        <div className="flex items-center justify-between py-4">
          <p>Role : </p>
          <select
            className="border"
            value={userRole}
            onChange={handleSelectionChange}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block border py-1 px-3
         rounded-full text-white bg-blue-900 pb-2 hover:bg-blue-700 hover:scale-105 transition-all"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
