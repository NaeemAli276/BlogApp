export async function getCategories() {
    const response = await fetch('/api/categories')
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}