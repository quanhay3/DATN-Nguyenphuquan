import instance from "./instance"

export const getProducts = async () => {
    const response = await instance.get('/product/list')
    return response
}