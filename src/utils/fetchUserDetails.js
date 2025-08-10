import Axios from "./Axios";
import summaryApi from "../common/summaryApi";

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...summaryApi.userDetails
        });
      
        return response.data;
    } catch (error) {
        console.log("Error fetching user details", error);
    }
};

export default fetchUserDetails;