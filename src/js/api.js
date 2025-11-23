// Data file path relative to index.html
const DATA_SOURCE = './src/data/posts.json'; 

/** Fetches content data from the JSON file. */
export async function fetchContentData() {
    try {
        const response = await fetch(DATA_SOURCE);
        if (!response.ok) {
            // Throw an error if the file isn't found (404) or failed to load
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.cars || []; // Return the array of cars
    } catch (error) {
        console.error("Could not fetch content data:", error);
        // Fallback or display error message on the page
        return [];
    }
}

/** Filters car content based on a search term (basic implementation). */
export async function filterContent(searchTerm) {
    const allCars = await fetchContentData();
    if (!searchTerm) return allCars;
    const lowerCaseTerm = searchTerm.toLowerCase();

    return allCars.filter(car => 
        car.title.toLowerCase().includes(lowerCaseTerm) ||
        car.location.toLowerCase().includes(lowerCaseTerm)
    );
}