import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'

const uploadImage = async(image)=>{
    try {
        const formData = new FormData()
        formData.append('image',image)

        const response = await Axios({
            ...SummaryApi.uploadImage,
            data : formData
        })

        return response
    } catch (error) {
        console.log("error in upload image",error)
        return error
    }
}

export default uploadImage