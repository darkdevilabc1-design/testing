// --- Inside src/js/components.js (Refactored) ---

/** Handles the Accordion click events. */
export function handleAccordion() {
    const accordionContainer = document.getElementById('faq-accordion');
    if (!accordionContainer) return;

    accordionContainer.addEventListener('click', (e) => {
        const header = e.target.closest('button[data-accordion-id]');
        if (!header) return;

        const id = header.dataset.accordionId;
        const body = document.getElementById(`accordion-body-${id}`);
        const icon = document.getElementById(`icon-${id}`);

        // Close all other accordions and reset their icons/styles
        accordionContainer.querySelectorAll('.accordion-body').forEach(item => {
            if (item.id !== body.id) {
                item.style.maxHeight = '0';
                item.style.opacity = '0';
                item.closest('div').querySelector('button').classList.remove('bg-gray-50');
                item.closest('div').querySelector('.transition-transform').classList.remove('rotate-45');
            }
        });

        // Toggle the clicked accordion
        if (body.style.maxHeight !== '0px' && body.style.maxHeight !== '') {
            body.style.maxHeight = '0';
            body.style.opacity = '0';
            header.classList.remove('bg-gray-50');
            icon.classList.remove('rotate-45');
        } else {
            body.style.maxHeight = body.scrollHeight + 'px'; 
            body.style.opacity = '1';
            header.classList.add('bg-gray-50');
            icon.classList.add('rotate-45');
        }
    });
}

/** Generates the HTML for a single car card, matching the provided design. */
export function createCarCard(item) {
    return `
        <div class="car-card bg-white border border-[#E4E6E8] rounded-[32px] relative p-[1px] h-[708px]">
            
            <div class="absolute top-[-18px] right-[40px] w-[169.3px] h-[36px] bg-white border border-[#E4E6E8] shadow-[0px_2px_7px_rgba(0,0,0,0.07)] rounded-full flex items-center px-4 z-10">
                <span class="text-[#FFC700]">★</span>
                <span class="ml-2 text-sm font-bold text-black">${item.rating} (${item.reviews})</span>
            </div>

            <div class="h-[326px] flex items-center justify-center overflow-hidden rounded-t-[32px] relative">
                <img src="${item.image_url}" alt="${item.title}" class="w-[390px] h-[298.34px] object-contain">
                
                <button class="absolute top-5 right-5 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center border border-transparent hover:border-black transition-all">
                    <span class="text-black">♡</span>
                </button>
            </div>
            
            <div class="p-8 pt-0 h-[381px]">
                <div class="mb-4">
                    <div class="flex items-center text-sm font-medium text-gray-600 mb-[16px]">
                        <span class="text-[#D6D7D8] mr-2">📍</span>
                        ${item.location}
                    </div>
                    
                    <h3 class="text-2xl leading-8 font-extrabold text-black h-[64px] overflow-hidden">
                        ${item.title}
                    </h3>
                </div>
                
                <div class="border-t border-[#E4E6E8] pt-6 grid grid-cols-2 gap-y-4 h-[104px] mt-[16px]">
                    
                    <div class="flex items-center">
                        <span class="text-[#D6D7D8] mr-2">📏</span>
                        <span class="text-base font-medium text-black">${item.mileage}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-[#D6D7D8] mr-2">⚙️</span>
                        <span class="text-base font-medium text-black">${item.transmission}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-[#D6D7D8] mr-2">⛽</span>
                        <span class="text-base font-medium text-black">${item.fuel}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-[#D6D7D8] mr-2">💺</span>
                        <span class="text-base font-medium text-black">${item.seats}</span>
                    </div>
                </div>
                
                <div class="flex justify-between items-center mt-[81px]">
                    <div class="flex items-baseline">
                        <span class="text-base font-medium text-gray-600 mr-1">from</span>
                        <h6 class="text-2xl font-extrabold text-black">$${item.price}</h6>
                    </div>
                    <a href="#" class="w-[104.14px] h-10 bg-[#F2F4F6] border border-[#E4E6E8] text-black font-bold text-sm rounded-full flex items-center justify-center transition-colors hover:bg-gray-200">
                        Book Now
                    </a>
                </div>
            </div>
        </div>
    `;
}

// ... rest of your components.js file ...

/** Renders initial content and sets up search listener. */
export async function initializeRecentCars(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Use the fetched data to render cards
    if (data && data.length > 0) {
        // Map the correct JSON data fields to the card component
        container.innerHTML = data.map(car => createCarCard({
            title: car.title,
            image_url: car.image_url,
            location: car.location,
            mileage: car.mileage,
            transmission: car.transmission,
            fuel: car.fuel,
            seats: car.seats,
            price: car.price,
            rating: car.rating,
            reviews: car.reviews
        })).join('');
    } else {
        container.innerHTML = `<p class="col-span-full text-center text-text-gray">No cars found or failed to load data.</p>`;
    }
}