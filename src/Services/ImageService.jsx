import Api from "../api/api";

const endpoint = "/images"

export const uploadImage = async (files,productId) => {
    const formData = new FormData()

    files.forEach(file => {
        formData.append("files",file);
    })

    formData.append("productId",productId);

    const result = await Api.post(`${endpoint}/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return result
}