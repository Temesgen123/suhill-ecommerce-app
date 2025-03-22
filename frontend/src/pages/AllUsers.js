import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    username: '',
    email: '',
    _id: '',
    role: '',
  });
  const [updateUserRoleOpen, setUpdateUserRoleOpen] = useState(false);
  const fetchAllUsers = async () => {
    const fetchedResponseData = await fetch(SummaryApi.allUsersList.url, {
      method: SummaryApi.allUsersList.method,
      credentials: 'include',
    });
    const responseData = await fetchedResponseData.json();
    if (responseData.success) {
      setUsers(responseData.data);
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="bg-white pb-5 relative">
      <table className="w-full text-white userTable">
        <thead className="border-b-2 ">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index+user}>
                <td className="px-3">{index + 1}</td>
                <td className="px-3">{user?.username}</td>
                <td className="px-3">{user?.email}</td>
                <td className="px-3">{user?.role}</td>
                <td className="px-3">{moment(user?.createdAt).format('l')}</td>
                <td className="px-3">
                  <button
                    className="bg-slate-200 h-6 w-6 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 hover:bg-white"
                    onClick={() => {
                      setUpdateUserDetails(user);
                      setUpdateUserRoleOpen(true);
                    }}
                  >
                    <MdModeEdit className="hover:text-red-500 text-green-600" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {updateUserRoleOpen && (
        <ChangeUserRole
          onClose={() => setUpdateUserRoleOpen(false)}
          userId={updateUserDetails._id}
          username={updateUserDetails.username}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          callFunction={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
