import axios from "axios";
// image upload

const basePI = process.env.NEXT_PUBLIC_API
export const uploadImageToServer = async (images: FormData) => {
    const response = await axios(`${basePI}/api/v1/files/upload`,{
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data:images
    })
    return response
   
}