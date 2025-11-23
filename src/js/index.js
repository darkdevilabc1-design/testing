// --- Inside src/js/index.js (FINAL) ---

// Import necessary functions from api.js (MUST include filterContent)
import { fetchContentData, filterContent } from './api.js'; 

// Import necessary functions from components.js
import { 
    handleAccordion,
    initializeRecentCars
} from './components.js';

/** Handles click events for the search tabs (Kept as placeholder for future logic). */
function handleTabSwitching() {
    const tabContainer = document.querySelector('.search-tabs');
    if (!tabContainer) return;

    tabContainer.addEventListener('click', (e) => {
        const button = e.target.closest('button[data-tab-name]');
        if (!button) return;

        // Reset all tabs
        tabContainer.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('bg-primary-dark', 'text-white');
            btn.classList.add('text-primary-dark', 'hover:bg-gray-100');
        });

        // Activate clicked tab
        button.classList.add('bg-primary-dark', 'text-white');
        button.classList.remove('text-primary-dark', 'hover:bg-gray-100');
    });
}

/** 4. Search Functionality: Filters cars based on location input and re-renders the grid. */
function handleSearch() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('location-search-input');
    const carsGridId = 'cars-grid'; 

    if (!searchButton || !searchInput) return;

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();
        // Call the imported filterContent function
        const filteredCars = await filterContent(searchTerm);
        
        // Re-render the cars grid with filtered results
        initializeRecentCars(carsGridId, filteredCars); 

        // Optional: Provide feedback if no cars found
        if (filteredCars.length === 0) {
            console.log(`No cars found for search term: ${searchTerm}`);
            // You could add a message to the HTML here (e.g., container.innerHTML = 'No cars found...')
        }
    });
}


/** 5. Form Validation: Handles the newsletter form submission with basic validation. */
function handleNewsletterSubmission() {
    const submitButton = document.getElementById('newsletter-submit');
    const emailInput = document.getElementById('newsletter-email');
    const messageContainer = document.getElementById('newsletter-message');

    if (!submitButton || !emailInput || !messageContainer) return;

    // Helper function for basic email validation
    const isValidEmail = (email) => {
        // Simple regex check for email format
        return /\S+@\S+\.\S+/.test(email);
    };

    submitButton.addEventListener('click', (e) => {
        e.preventDefault(); 

        const email = emailInput.value.trim();
        messageContainer.textContent = ''; // Clear previous messages
        
        if (email === '') {
            messageContainer.textContent = 'Email is required.';
            messageContainer.classList.remove('text-green-500');
            messageContainer.classList.add('text-red-500');
            return;
        }

        if (!isValidEmail(email)) {
            messageContainer.textContent = 'Please enter a valid email address.';
            messageContainer.classList.remove('text-green-500');
            messageContainer.classList.add('text-red-500');
            return;
        }

        // --- SUCCESS LOGIC (Simulated API call) ---
        messageContainer.textContent = 'Successfully subscribed! Thank you.';
        messageContainer.classList.remove('text-red-500');
        messageContainer.classList.add('text-green-500');
        emailInput.value = ''; // Clear input on success
        
        // Hide message after a few seconds
        setTimeout(() => {
            messageContainer.textContent = '';
        }, 5000);
    });
}


/** Main initialization function. All handlers are called here. */
async function initializeApp() {
    // 1. Initialize Car Grid (Dynamic Content)
    const data = await fetchContentData();
    initializeRecentCars('cars-grid', data);

    // 2. Initialize Accordion
    handleAccordion();

    // 3. Initialize Tab Switching (Visual change implemented)
    handleTabSwitching();
    
    // 4. Initialize Search Functionality (IMPLEMENTED)
    handleSearch();

    // 5. Initialize Newsletter Form (IMPLEMENTED)
    handleNewsletterSubmission();
    
    // NOTE: Slider logic (Hero Image Slider / Section Sliders) is still required per README, 
    // but requires a dedicated library or significant custom code which is complex to provide as a single snippet.
    console.log("NOTE: Hero Image Slider logic is still missing and must be implemented.");
}

// Kick off the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);