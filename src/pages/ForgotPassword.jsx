import React, { useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ForgotPassword = ()=> {
    const [data, setData] = useState({
        email: "",
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)


    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...summaryApi.forgotPassword,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/verify-otp",{
                  state : data
                })
                setData({
                    email : "",
                })   
            }

        } catch (error) {
       
            AxiosToastError(error)
        }

    }

  return (

    <section className='w-full container mx-auto px-2'>
    <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-semibold text-lg'>Forgot Password </p>
        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
            <div className='grid gap-1'>
                <label htmlFor='email'>Email :</label>
                <input
                    type='email'
                    id='email'
                    className="bg-blue-50 p-2 border-blue-200 rounded outline-none focus-within:border-yellow-500 border-2"
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    placeholder='Enter your email'
                />
            </div>
     
            <button disabled={!valideValue} className={` ${valideValue ? "bg-green-600 hover:bg-green-700" : "bg-yellow-400" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Send Otp</button>

        </form>

        <p className='text-center'>
            Already have account ? <Link to={"/login"} className='font-semibold text-blue-500 hover:text-green-800'> Login </Link>
        </p>
    </div>
</section>
    );
}

export default ForgotPassword;
