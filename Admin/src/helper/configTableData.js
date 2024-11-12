export const getDataTableList = (data) => {
    return data.map((item, index) => {
        return {
            key: index + 1,
            ...item
        }
    })
}