// import { Outlet, useLocation } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import "./App.css";
// import "./index.css";
// import { Toaster } from "react-hot-toast";
// import fetchUserDetails from "./utils/fetchUserDetails";
// import { useEffect } from "react";
// import { setUserDetails } from "./store/userSlice";
// import { useDispatch } from "react-redux";
// import Axios from "./utils/Axios";
// import summaryApi from "./common/summaryApi";
// import { setAllCategory, setLoadingCategory, setAllSubCategory } from "./store/productSlice";
// import GlobalProvider from "./provider/GlobalProvider";
// import CartMobileLink from "./components/CartMobile";

// function App() {
//   const dispatch = useDispatch();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userInfo = await fetchUserDetails();
//         dispatch(setUserDetails(userInfo.data));
//       } catch (error) {
//         console.log("Error in fetchUser function in App component", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const fetchCategory = async () => {
//     try {
//       dispatch(setLoadingCategory(true));
//       const response = await Axios({
//         ...summaryApi.getCategory,
//       });
//       const { data: responseData } = response;

//       if (responseData.success) {
//         dispatch(
//           setAllCategory(
//             responseData.data.sort((a, b) => a.name.localeCompare(b.name))
//           )
//         );
//       }
//     } catch (error) {
//     } finally {
//       dispatch(setLoadingCategory(false));
//     }
//   };

//   const fetchSubCategory = async () => {
//     try {
//       dispatch(setLoadingCategory(true));
//       const response = await Axios({
//         ...summaryApi.getSubCategory,
//       });
//       const { data: responseData } = response;

//       if (responseData.success) {
//         dispatch(
//           setAllSubCategory(
//             responseData.data.sort((a, b) => a.name.localeCompare(b.name))
//           )
//         );
//       }
//     } catch (error) {
//     } finally {
//       dispatch(setLoadingCategory(false));
//     }
//   };

//   useEffect(() => {
//     fetchCategory();
//     fetchSubCategory();
//   }, []);

//   return (
//     <GlobalProvider>
//       <Header />
//       <main className="min-h-[78vh]">
//         <Outlet />
//       </main>
//       <Footer />
//       <Toaster />
//       {
//         location.pathname !== '/checkout' && (
//           <CartMobileLink/>
//         )
//       }
//     </GlobalProvider>
//   );
// }

// export default App;
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useEffect } from "react";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import Axios from "./utils/Axios";
import summaryApi from "./common/summaryApi";
import { setAllCategory, setLoadingCategory, setAllSubCategory } from "./store/productSlice";
import GlobalProvider from "./provider/GlobalProvider";
import CartMobileLink from "./components/CartMobile";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      // Check if user has a token before attempting to fetch user details
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        console.log("No authentication token found, skipping user fetch");
        return; // Don't make API call if no token
      }

      try {
        const userInfo = await fetchUserDetails();
        
        // Check if userInfo exists and has data before accessing it
        if (userInfo && userInfo.data) {
          dispatch(setUserDetails(userInfo.data));
        } else {
          console.log("No user data received");
        }
      } catch (error) {
        console.log("Error in fetchUser function in App component", error);
        
        // Handle specific error cases
        if (error.response?.status === 401) {
          console.log("User token invalid or expired");
          // Clear invalid tokens
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          // Don't dispatch user details for unauthenticated users
        } else {
          console.log("Other error occurred:", error.message);
        }
      }
    };

    fetchUser();
  }, [dispatch]);

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...summaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...summaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllSubCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
      console.log("Error fetching subcategories:", error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
      }
    </GlobalProvider>
  );
}

export default App;