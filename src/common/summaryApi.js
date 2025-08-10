export const baseURL = import.meta.env.VITE_BACKEND_URL;

const summaryApi = {
    register : {
        url : `/api/user/register`,
        method : "POST"
    },
    login : {
        url : `/api/user/login`,
        method : "POST"
    },
    forgotPassword : {
        url : `/api/user/forgot-password`,
        method : "PUT"
    },
    verifyotp :{
        url : `/api/user/verify-otp`,
        method : "PUT"
    },
    resetPassword : {
        url : `/api/user/reset-password`,
        method : "PUT"
    },
    refreshToken : {
        url : `/api/user/refresh-token`,
        method : "POST"
    },
    logout : {
        url : `/api/user/logout`,
        method : "GET"
    },
    updateAvatar : {
        url : `/api/user/update-avatar`,
        method : "PUT"
    },
    userDetails : {
        url : `/api/user/user-details`,
        method : "GET"
    },
    updateUser : {
        url : `/api/user/update-user`,
        method : "PUT"
    },
    verifyEmail : {
        url : `/api/user/verify-email`,
        method : "POST"
    },
    uploadAvatar:{
        url : `/api/user/update-avatar`,
        method : "PUT"
    },
    updateUserDetails : {
        url : `/api/user/update-user`,
        method : "PUT"
    },
    addCategory : {
        url : `/api/category/add-category`,
        method : "POST" 
    },
    uploadImage : {
        url : `/api/file/upload`,
        method : "POST"
    },
    getCategory : {
        url : `/api/category/get`,
        method : "GET"
    },
    updateCategory : {
        url : `/api/category/update`,
        method : "PUT"
    },
    deleteCategory : {
        url : `/api/category/delete`,
        method : "DELETE"
    },
    createSubCategory : {
        url : `/api/subcategory/create`,
        method : "POST"
    },
    getSubCategory : {
        url : `/api/subcategory/get`,
        method : "POST"
    },
    updateSubCategory : {
        url : `/api/subcategory/update`,
        method : "PUT"
    },
    deleteSubCategory : {
        url : `/api/subcategory/delete`,
        method : "DELETE"
    },
    createProduct : {
        url : `/api/product/create`,
        method : "POST"
    },
    getProduct : {
        url : `/api/product/get`,
        method : "POST"
    },
    getProductByCategory : {
        url : `/api/product/get-product-by-category`,
        method : "POST"
    },
    getProductByCategoryAndSubCategory : {
        url : `/api/product/get-pruduct-by-category-and-subcategory`,
        method : "POST"
    },
    getProductDetails : {
        url : `/api/product/get-product-details`,
        method : "POST"
    },
    updateProduct : {
        url : `/api/product/update-product-details`,
        method : "PUT"
    },
    deleteProduct : {
        url : `/api/product/delete-product`,
        method : "DELETE"
    },
    searchProduct : {
        url : `/api/product/search-product`,
        method : "POST"
    },
    addTocart : {
        url : "/api/cart/create",
        method : 'post'
    },
    getCartItem : {
        url : '/api/cart/get',
        method : 'get'
    },
    updateCartItemQty : {
        url : '/api/cart/update-qty',
        method : 'put'
    },
    deleteCartItem : {
        url : '/api/cart/delete-cart-item',
        method : 'delete'
    },
    createAddress : {
        url : '/api/address/create',
        method : 'post'
    },
    getAddress : {
        url : '/api/address/get',
        method : 'get'
    },
    updateAddress : {
        url : '/api/address/update',
        method : 'put'
    },
    disableAddress : {
        url : '/api/address/disable',
        method : 'delete'
    },
    CashOnDeliveryOrder : {
        url : "/api/order/cash-on-delivery",
        method : 'post'
    },
    payment_url : {
        url : "/api/order/checkout",
        method : 'post'
    },
    getOrderItems : {
        url : '/api/order/order-list',
        method : 'get'
    },
    allUsers :{
        url : '/api/user/getAllUsers',
        method : 'get'
    }
 }  

export default summaryApi;