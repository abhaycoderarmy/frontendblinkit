import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import AxiosError from "../utils/AxiosToastError";

const Allusers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const responseData = await Axios({
        ...summaryApi.allUsers,
      });
      console.log("responseData", responseData);
      if (responseData.data.success) {
        console.log("responseData fetched");
        setAllUsers(responseData.data.data);
        toast.success(responseData.data.message);
      }
    } catch (error) {
      console.log("error in fetch all users", error);
      toast.error("Something went wrong while fetching all users");
      AxiosError(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      {allUsers.length === 0 ? (
        <div className="text-center text-gray-500">No users found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-all"
            >
              <div className="flex flex-col gap-2 mb-3">
                <h2 className="text-xl font-semibold">{user.name}</h2>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <FaEnvelope className="text-blue-500" />
                <span>{user.email}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <FaPhone className="text-green-500" />
                <span>{user.mobile ? user.mobile : "N/A"}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <FaUserShield className="text-purple-500" />
                <span>{user.role ? user.role : "User"}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                {user.status === "active" ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaTimesCircle className="text-red-600" />
                )}
                <span
                  className={
                    user.status === "active" ? "text-green-600" : "text-red-600"
                  }
                >
                  {user.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Allusers;
