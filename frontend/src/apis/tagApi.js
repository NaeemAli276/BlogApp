import axios from "axios"

export async function getTags() {
    
    const url = `http://localhost:8000/api/tags/`

    try {

        const { data } = await axios(url, {
            headers: {
                Accept: 'application/json'
            }
        })

        console.log(data.tags)
        return data

    }
    catch (error) {
        throw error
    }

}

export async function getSearchedTags(searchTerm) {
    
    const url = `http://localhost:8000/api/tags/search?search=${searchTerm}`

    try {

        const { data } = await axios(url, {
            headers: {
                Accept: 'application/json'
            }
        })

        // console.log(data.tags)
        return data.tags

    }
    catch (error) {
        throw error
    }

}