import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa'
import UserAvatarEdit from '../components/UserAvatarEdit'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { setUserDetails } from '../store/userSlice'
import { useEffect } from 'react'
import fetchUserDetails from '../utils/fetchUserDetails'
import { toast } from 'react-hot-toast'



const Profile = () => {
    const user = useSelector((state) => state.user)
    const [openEditAvatar,setOpenEditAvatar] = useState(false);
 
    const [userData,setUserData] = useState({
        name: user.name,
        email: user.email,
        mobile : user.mobile
    });

    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        setUserData({
            name : user.name,
            email : user.email,
            mobile : user.mobile,
        })
    },[user])

    const handleOnchange = (e)=>{
        const { name, value } = e.target;
        setUserData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data : userData
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }

        } catch (error) {
            console.log("error in handle submit",error)
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
    }
      
  return (
    <div>
        <div className='py-3 ml-5 w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden'>
         {
            user?.avatar?(
                <img
                src={user.avatar}
                alt={user.name}
                />
            ):
            (
                <FaRegUserCircle size={40} className='bg-red-500 w-14 h-14 rounded-full'/>
            )
         }
        </div>
        <button onClick={()=> setOpenEditAvatar(true) } 
        className='mt-4 px-3 py-1 border rounded-full hover:bg-green-600 bg-amber-400 text-white'> 
        Change Profile </button>

        {
            openEditAvatar && (<UserAvatarEdit close={()=>setOpenEditAvatar(false)} />)
        }

        <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
            <div className='grid'>
                <label htmlFor='name'> Name :</label>
                <input 
                type='text'
                id='name'
                name='name'
                placeholder='Enter your name'
                value={userData.name}
                className='bg-blue-50 p-2 border-blue-200 rounded outline-none focus-within:border-yellow-500 border-2'
                onChange={handleOnchange}
                required
                />
            </div>
            <div className='grid'>
                <label htmlFor='email'> Email :</label>
                <input 
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                value={userData.email}
                className='bg-blue-50 p-2 border-blue-200 rounded outline-none focus-within:border-yellow-500 border-2'
                onChange={handleOnchange}
                required
                />
            </div>
            <div className='grid'>
                <label htmlFor='mobile'> Mobile No :</label>
                <input 
                type='text'
                id='mobile'
                name='mobile'
                placeholder='Enter your mobile number'
                value={userData.mobile} 
                className='bg-blue-50 p-2 border-blue-200 rounded outline-none focus-within:border-yellow-500 border-2'
                onChange={handleOnchange}
                required
                />
            </div>
            <button className='border px-4 py-2 font-semibold hover:bg-green-600 text-white bg-yellow-400 rounded'>
                {
                    loading ? "Loading..." : "Submit"
                }
            </button>
        </form>
      
    </div>
  )
}

export default Profile