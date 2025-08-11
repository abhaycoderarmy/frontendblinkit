// import { createContext,useContext, useEffect, useState } from "react";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/summaryApi";
// import { useDispatch, useSelector } from "react-redux";
// import { handleAddItemCart } from "../store/cartProduct";
// import AxiosToastError from "../utils/AxiosToastError";
// import toast from "react-hot-toast";
// import { pricewithDiscount } from "../utils/PriceWithDiscount";
// import { handleAddAddress } from "../store/addressSlice";
// import { setOrder } from "../store/orderSlice";

// export const GlobalContext = createContext(null)

// export const useGlobalContext = ()=> useContext(GlobalContext)

// const GlobalProvider = ({children}) => {
//     const dispatch = useDispatch()
//     const [totalPrice,setTotalPrice] = useState(0)
//     const [notDiscountTotalPrice,setNotDiscountTotalPrice] = useState(0)
//     const [totalQty,setTotalQty] = useState(0)
//     const cartItem = useSelector(state => state.cartItem.cart)
//     const user = useSelector(state => state?.user)

//     const fetchCartItem = async()=>{
//         try {
//           const response = await Axios({
//             ...SummaryApi.getCartItem
//           })
//           const { data : responseData } = response
    
//           if(responseData.success){
//             dispatch(handleAddItemCart(responseData.data))
//           }
    
//         } catch (error) {
//         }
//     }


//     const updateCartItem = async(id,qty)=>{
//       try {
//           const response = await Axios({
//             ...SummaryApi.updateCartItemQty,
//             data : {
//               _id : id,
//               qty : qty
//             }
//           })
//           const { data : responseData } = response

//           if(responseData.success){
//               fetchCartItem()
//               return responseData
//           }
//       } catch (error) {
//         AxiosToastError(error)
//         return error
//       }
//     }


//     const deleteCartItem = async(cartId)=>{
//       try {
//           const response = await Axios({
//             ...SummaryApi.deleteCartItem,
//             data : {
//               _id : cartId
//             }
//           })
//           const { data : responseData} = response

//           if(responseData.success){
//             toast.success(responseData.message)
//             fetchCartItem()
//           }
//       } catch (error) {
//          AxiosToastError(error)
//       }
//     }

//     useEffect(()=>{
//       const qty = cartItem.reduce((preve,curr)=>{
//           return preve + curr.quantity
//       },0)
//       setTotalQty(qty)
      
//       const tPrice = cartItem.reduce((preve,curr)=>{
//           const priceAfterDiscount = pricewithDiscount(curr?.productId?.price,curr?.productId?.discount)

//           return preve + (priceAfterDiscount * curr.quantity)
//       },0)
//       setTotalPrice(tPrice)

//       const notDiscountPrice = cartItem.reduce((preve,curr)=>{
//         return preve + (curr?.productId?.price * curr.quantity)
//       },0)
//       setNotDiscountTotalPrice(notDiscountPrice)
//   },[cartItem])

//     const handleLogoutOut = ()=>{
//         localStorage.clear()
//         dispatch(handleAddItemCart([]))
//     }

//     const fetchAddress = async()=>{
//       try {
//         const response = await Axios({
//           ...SummaryApi.getAddress
//         })
//         const { data : responseData } = response

//         if(responseData.success){
//           dispatch(handleAddAddress(responseData.data))
//         }
//       } catch (error) {
//         AxiosToastError(error)
//       }
//     }
    
//     const fetchOrder = async()=>{
//       try {
//         const response = await Axios({
//           ...SummaryApi.getOrderItems,
//         })
//         const { data : responseData } = response

//         if(responseData.success){
//             dispatch(setOrder(responseData.data))
//         }
//       } catch (error) {
//         AxiosToastError(error)
//       }
//     }

//     useEffect(()=>{
//       fetchCartItem()
//       handleLogoutOut()
//       fetchAddress()
//       fetchOrder()
//     },[user])
    
//     return(
//         <GlobalContext.Provider value={{
//             fetchCartItem,
//             updateCartItem,
//             deleteCartItem,
//             fetchAddress,
//             totalPrice,
//             totalQty,
//             notDiscountTotalPrice,
//             fetchOrder
//         }}>
//             {children}
//         </GlobalContext.Provider>
//     )
// }

// export default GlobalProvider

// // import { createContext,useContext, useEffect, useState } from "react";
// // import Axios from "../utils/Axios";
// // import SummaryApi from "../common/summaryApi";
// // import { useDispatch, useSelector } from "react-redux";
// // import { handleAddItemCart } from "../store/cartProduct";
// // import AxiosToastError from "../utils/AxiosToastError";
// // import toast from "react-hot-toast";
// // import { pricewithDiscount } from "../utils/PriceWithDiscount";
// // import { handleAddAddress } from "../store/addressSlice";
// // import { setOrder } from "../store/orderSlice";

// // export const GlobalContext = createContext(null)

// // export const useGlobalContext = ()=> useContext(GlobalContext)

// // const GlobalProvider = ({children}) => {
// //     const dispatch = useDispatch()
// //     const [totalPrice,setTotalPrice] = useState(0)
// //     const [notDiscountTotalPrice,setNotDiscountTotalPrice] = useState(0)
// //     const [totalQty,setTotalQty] = useState(0)
// //     const cartItem = useSelector(state => state.cartItem.cart)
// //     const user = useSelector(state => state?.user)

// //     // Check if user is authenticated
// //     const isAuthenticated = () => {
// //         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
// //         return !!token && !!user?._id; // Check both token and user data
// //     };

// //     const fetchCartItem = async()=>{
// //         // Only fetch if user is authenticated
// //         if (!isAuthenticated()) {
// //             console.log('No authentication token or user, skipping cart fetch');
// //             return;
// //         }

// //         try {
// //           const response = await Axios({
// //             ...SummaryApi.getCartItem
// //           })
// //           const { data : responseData } = response
    
// //           if(responseData.success){
// //             dispatch(handleAddItemCart(responseData.data))
// //           }
    
// //         } catch (error) {
// //             console.error('Error fetching cart items:', error);
            
// //             // Handle 401 errors specifically
// //             if (error.response?.status === 401) {
// //                 console.log('Cart fetch unauthorized - clearing auth tokens');
// //                 localStorage.removeItem('token');
// //                 sessionStorage.removeItem('token');
// //                 dispatch(handleAddItemCart([])); // Clear cart items
// //             } else {
// //                 AxiosToastError(error);
// //             }
// //         }
// //     }

// //     const updateCartItem = async(id,qty)=>{
// //       try {
// //           const response = await Axios({
// //             ...SummaryApi.updateCartItemQty,
// //             data : {
// //               _id : id,
// //               qty : qty
// //             }
// //           })
// //           const { data : responseData } = response

// //           if(responseData.success){
// //               fetchCartItem()
// //               return responseData
// //           }
// //       } catch (error) {
// //         AxiosToastError(error)
// //         return error
// //       }
// //     }

// //     const deleteCartItem = async(cartId)=>{
// //       try {
// //           const response = await Axios({
// //             ...SummaryApi.deleteCartItem,
// //             data : {
// //               _id : cartId
// //             }
// //           })
// //           const { data : responseData} = response

// //           if(responseData.success){
// //             toast.success(responseData.message)
// //             fetchCartItem()
// //           }
// //       } catch (error) {
// //          AxiosToastError(error)
// //       }
// //     }

// //     useEffect(()=>{
// //       const qty = cartItem.reduce((preve,curr)=>{
// //           return preve + curr.quantity
// //       },0)
// //       setTotalQty(qty)
      
// //       const tPrice = cartItem.reduce((preve,curr)=>{
// //           const priceAfterDiscount = pricewithDiscount(curr?.productId?.price,curr?.productId?.discount)

// //           return preve + (priceAfterDiscount * curr.quantity)
// //       },0)
// //       setTotalPrice(tPrice)

// //       const notDiscountPrice = cartItem.reduce((preve,curr)=>{
// //         return preve + (curr?.productId?.price * curr.quantity)
// //       },0)
// //       setNotDiscountTotalPrice(notDiscountPrice)
// //   },[cartItem])

// //     const handleLogoutOut = ()=>{
// //         localStorage.clear()
// //         dispatch(handleAddItemCart([]))
// //         dispatch(handleAddAddress([]))
// //         dispatch(setOrder([]))
// //     }

// //     const fetchAddress = async()=>{
// //         // Only fetch if user is authenticated
// //         if (!isAuthenticated()) {
// //             console.log('No authentication token or user, skipping address fetch');
// //             return;
// //         }

// //       try {
// //         const response = await Axios({
// //           ...SummaryApi.getAddress
// //         })
// //         const { data : responseData } = response

// //         if(responseData.success){
// //           dispatch(handleAddAddress(responseData.data))
// //         }
// //       } catch (error) {
// //         console.error('Error fetching addresses:', error);
        
// //         // Handle 401 errors specifically
// //         if (error.response?.status === 401) {
// //             console.log('Address fetch unauthorized - clearing auth tokens');
// //             localStorage.removeItem('token');
// //             sessionStorage.removeItem('token');
// //             dispatch(handleAddAddress([])); // Clear addresses
// //         } else {
// //             AxiosToastError(error);
// //         }
// //       }
// //     }
    
// //     const fetchOrder = async()=>{
// //         // Only fetch if user is authenticated
// //         if (!isAuthenticated()) {
// //             console.log('No authentication token or user, skipping order fetch');
// //             return;
// //         }

// //       try {
// //         const response = await Axios({
// //           ...SummaryApi.getOrderItems,
// //         })
// //         const { data : responseData } = response

// //         if(responseData.success){
// //             dispatch(setOrder(responseData.data))
// //         }
// //       } catch (error) {
// //         console.error('Error fetching orders:', error);
        
// //         // Handle 401 errors specifically
// //         if (error.response?.status === 401) {
// //             console.log('Order fetch unauthorized - clearing auth tokens');
// //             localStorage.removeItem('token');
// //             sessionStorage.removeItem('token');
// //             dispatch(setOrder([])); // Clear orders
// //         } else {
// //             AxiosToastError(error);
// //         }
// //       }
// //     }

// //     // Function to refetch user data after login
// //     const refetchUserData = () => {
// //         if (isAuthenticated()) {
// //             fetchCartItem();
// //             fetchAddress();
// //             fetchOrder();
// //         }
// //     };

// //     // Only fetch data when user is authenticated and available
// //     useEffect(()=>{
// //         if (isAuthenticated()) {
// //             fetchCartItem()
// //             fetchAddress()
// //             fetchOrder()
// //         } else if (user && !user._id) {
// //             // User object exists but no user data - user might be logged out
// //             handleLogoutOut()
// //         }
// //     },[user])
    
// //     return(
// //         <GlobalContext.Provider value={{
// //             fetchCartItem,
// //             updateCartItem,
// //             deleteCartItem,
// //             fetchAddress,
// //             totalPrice,
// //             totalQty,
// //             notDiscountTotalPrice,
// //             fetchOrder,
// //             handleLogoutOut,
// //             refetchUserData,
// //             isAuthenticated
// //         }}>
// //             {children}
// //         </GlobalContext.Provider>
// //     )
// // }

// // export default GlobalProvider

import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

export const GlobalContext = createContext(null)

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch()
    const [totalPrice, setTotalPrice] = useState(0)
    const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state?.user)

    const fetchCartItem = async () => {
        try {
            // Add authentication check
            const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
            if (!token && user?.token) {
                console.log('No token found, skipping cart fetch');
                return;
            }

            const response = await Axios({
                ...SummaryApi.getCartItem
            })
            const { data: responseData } = response

            console.log('Cart API Response:', responseData); // Debug log

            if (responseData.success) {
                dispatch(handleAddItemCart(responseData.data))
            } else {
                console.error('Cart fetch failed:', responseData.message);
                // Clear cart if API returns failure
                dispatch(handleAddItemCart([]));
            }

        } catch (error) {
            console.error('Error fetching cart items:', error);
            // Don't show toast error for cart fetch failures
            // AxiosToastError(error)
            
            // Clear cart on error to prevent showing stale data
            dispatch(handleAddItemCart([]));
        }
    }

    const updateCartItem = async (id, qty) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateCartItemQty,
                data: {
                    _id: id,
                    qty: qty
                }
            })
            const { data: responseData } = response

            if (responseData.success) {
                await fetchCartItem() // Ensure cart is refreshed
                return responseData
            }
        } catch (error) {
            AxiosToastError(error)
            return error
        }
    }

    const deleteCartItem = async (cartId) => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCartItem,
                data: {
                    _id: cartId
                }
            })
            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                await fetchCartItem() // Ensure cart is refreshed
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    useEffect(() => {
        const qty = cartItem.reduce((preve, curr) => {
            return preve + curr.quantity
        }, 0)
        setTotalQty(qty)

        const tPrice = cartItem.reduce((preve, curr) => {
            const priceAfterDiscount = pricewithDiscount(curr?.productId?.price, curr?.productId?.discount)
            return preve + (priceAfterDiscount * curr.quantity)
        }, 0)
        setTotalPrice(tPrice)

        const notDiscountPrice = cartItem.reduce((preve, curr) => {
            return preve + (curr?.productId?.price * curr.quantity)
        }, 0)
        setNotDiscountTotalPrice(notDiscountPrice)
    }, [cartItem])

    const handleLogoutOut = () => {
        localStorage.clear()
        dispatch(handleAddItemCart([]))
    }

    const fetchAddress = async () => {
        try {
            const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
            if (!token && user?.token) {
                return;
            }

            const response = await Axios({
                ...SummaryApi.getAddress
            })
            const { data: responseData } = response

            if (responseData.success) {
                dispatch(handleAddAddress(responseData.data))
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            // AxiosToastError(error)
        }
    }

    const fetchOrder = async () => {
        try {
            const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
            if (!token && user?.token) {
                return;
            }

            const response = await Axios({
                ...SummaryApi.getOrderItems,
            })
            const { data: responseData } = response

            if (responseData.success) {
                dispatch(setOrder(responseData.data))
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            // AxiosToastError(error)
        }
    }

    // Modified useEffect to handle user state properly
    useEffect(() => {
        // Only fetch data if user is authenticated
        if (user && (user.token || localStorage.getItem('token'))) {
            fetchCartItem()
            fetchAddress()
            fetchOrder()
        } else {
            // Clear data if user is not authenticated
            dispatch(handleAddItemCart([]))
            dispatch(handleAddAddress([]))
            dispatch(setOrder([]))
        }
    }, [user])

    // Remove the handleLogoutOut call from useEffect
    // This was clearing the cart every time user state changed

    return (
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartItem,
            deleteCartItem,
            fetchAddress,
            totalPrice,
            totalQty,
            notDiscountTotalPrice,
            fetchOrder
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider