import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { replace, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...summaryApi.login,
        data: data,
      });
      
      if(response.data.error){
        toast.error(response.data.message)
    }
      if (response.data.success) {
        localStorage.setItem("AccessToken", response.data.data.accessToken);
        localStorage.setItem("RefreshToken", response.data.data.refreshToken);

        const userDetail = await fetchUserDetails();
        dispatch(setUserDetails(userDetail.data));

        toast.success("User Logged in successfully");
        setData({
          email: "",
          password: "",
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      AxiosToastError(error);
  
    }
  };


  const allFieldsAreFilled = Object.values(data).every((el) => el);

  return (
    <section className="w-full container mx-auto px-2 py-15 ">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className=" text-xl font-semibold">Welcome to QuickMart</p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email"> Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              autoFocus
              className="bg-blue-50 p-2 border-blue-200 rounded outline-none focus-within:border-yellow-500 border-2"
              value={data.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password"> Password : </label>
            <div className="bg-blue-50 p-2 border-blue-200 rounded flex justify-between focus-within:border-yellow-500 border-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoFocus
                className="w-full outline-none"
                value={data.password}
                placeholder="Enter your password"
                onChange={handleChange}
              />

              <div onClick={handleShowPassword} className="cursor-pointer">
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <div className="text-right text-blue-700 font-semibold">
            <Link to={"/forgot-password"}> Forgot Password ?</Link>
          </div>
          <button
            disabled={!allFieldsAreFilled}
            className={` ${
              allFieldsAreFilled
                ? "bg-green-600 hover:bg-green-700"
                : "bg-yellow-400"
            } text-white py-2 rounded cursor-pointer font-semibold my-1 tracking-wide`}
          >
            Login
          </button>
        </form>

        <div className="text-center mt-2">
          <p>
            {" "}
            Don't have any account ?{" "}
            <Link
              to={"/register"}
              className="text-blue-700 font-semibold hover:text-green-800 "
            >
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
