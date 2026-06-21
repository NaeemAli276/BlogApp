import axios from "axios"

export async function getCategories() {
    
    const url = `http://localhost:8000/api/categories`

    try {

        const { data } = await axios(url, {
            headers: {
                Accept: 'application/json'
            }
        })

        return data.categories

    }
    catch (error) {
        throw error
    }

}