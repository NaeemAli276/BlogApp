export async function getTags() {
    
    const url = `http://localhost:8000/api/tags/`

    try {

        const { data } = await axios(url, {
            headers: {
                Accept: 'application/json'
            }
        })

        console.log(data)
        return data

    }
    catch (error) {
        throw error
    }

}