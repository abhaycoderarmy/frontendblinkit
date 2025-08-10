import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(data.password !== data.confirmPassword){
        toast.error("Password and Confirm Password must be same");
        return;
    }

    try {
        const response = await Axios({
            ...summaryApi.register,
            data : data
        });
        
        if(response.data.error){
            toast.error(response.data.message);
        }

        if(response.data.success){
        toast.success("User registered successfully");
        setData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/login");
        }

    } catch (error) {
        AxiosToastError(error);
    }

};

  const allFieldsAreFilled = Object.values(data).every(el=>el);

  return (
    <section className="w-full container mx-auto px-2 ">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className=" text-xl font-semibold">Welcome to QuickMart</p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name"> Name : </label>
            <input
              type="text"
              id="name"
              name="name"
              autoFocus
              className="bg-blue-50 p-2 border-blue-200 rounded outline-none focus-within:border-yellow-500 border-2"
              value={data.name}
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>

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

          <div className="grid gap-1">
            <label htmlFor="confirmPassword"> Confirm Password : </label>
            <div className="bg-blue-50 p-2 border-blue-200 rounded flex justify-between focus-within:border-yellow-500 border-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                autoFocus
                className="w-full outline-none"
                value={data.confirmPassword}
                placeholder="Enter your password"
                onChange={handleChange}
              />

              <div
                onClick={handleShowConfirmPassword}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <button disabled={!allFieldsAreFilled} className={` ${allFieldsAreFilled ? "bg-green-600 hover:bg-green-700" : "bg-yellow-400" } text-white py-2 rounded cursor-pointer font-semibold my-3 tracking-wide`}>
            Register
          </button>
        </form>

        <div className="text-center py-1">
            <p> Already have account ? <Link to={"/login"} className="text-blue-700 font-semibold hover:text-green-800 ">Login</Link> </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
