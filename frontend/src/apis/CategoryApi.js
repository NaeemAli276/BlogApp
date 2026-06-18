export async function getCategories() {
    
    const url = `http://localhost:8000/api/category`

    try {

        const { data } = await axios(url, {
            headers: {
                Accept: 'application/json'
            }
        })

        return data.data

    }
    catch (error) {
        throw error
    }

}