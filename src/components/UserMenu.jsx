import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";
// import isAdmin from '../utils/isAdmin'

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...summaryApi.logout,
      });

      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div>
      <div className="font-semibold ml-2"> My Account </div>
      <div className="text-sm mt-1 ml-2 flex items-center">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user?.name || user?.email} <span className="text-red-500 font-md">
            {isAdmin(user?.role) && "(Admin)"}</span>
        </span>
        <Link onClick={handleClose} to={"/dashboard/profile"}>
          <HiOutlineExternalLink
            size={18}
            className=" ml-1 hover:text-yellow-300"
          />
        </Link>
      </div>

      <Divider />

      <div className="grid grid-2 text-sm gap-2 ">
        {isAdmin(user?.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/category"}
            className="px-2 p-1 hover:bg-yellow-200"
          >
            Category
          </Link>
        )}
        {isAdmin(user?.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/subcategory"}
            className="px-2 p-1 hover:bg-yellow-200"
          >
            Sub Category
          </Link>
        )}
        {isAdmin(user?.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/upload-product"}
            className="px-2 p-1 hover:bg-yellow-200"
          >
            Upload Product
          </Link>
        )}
        {isAdmin(user?.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/product"}
            className="px-2 p-1 hover:bg-yellow-200"
          >
            Product
          </Link>
        )}
        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="px-2 p-1 hover:bg-yellow-200"
        >
          My Orders
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-2 p-1 hover:bg-yellow-200"
        >
          Save Address
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/getAllUsers"}
          className="px-2 p-1 hover:bg-yellow-200"
        >
          All Users
        </Link>
        <button
          onClick={handleLogout}
          className="text-center px-2 py-2 bg-red-500 rounded w-20 p-3 
          font-semibold text-white mt-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
