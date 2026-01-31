export async function getTags() {
    
    const response = await fetch('/api/tags')
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();

}