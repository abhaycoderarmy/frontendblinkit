import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  console.log("order Items",orders)
  return (
    <div className='container mx-auto p-4'>
      <div className='bg-white shadow-md p-3 font-semibold mb-4'>
        <h1 className='text-xl'>Order</h1>
      </div>
        {
          !orders[0] && (
            <NoData/>
          )
        }
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {
            orders.map((order,index)=>{
              return(
                <div key={order._id+index+"order"} className='order rounded p-4 text-sm bg-blue-50'>
                    <p className='mb-2 object-cover rounded text-sm '>Order No : {order?.orderId}</p>
                    <div className='flex gap-3 items-center'>
                      <img
                        src={order.product_details.image[0]} 
                        className='w-14 h-14 object-cover rounded'
                      />  
                      <p className='font-sm object-cover rounded '>{order.product_details.name}</p>
                    </div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default MyOrders