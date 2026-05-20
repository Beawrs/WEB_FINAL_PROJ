// Gallery Lightbox
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("closeLightbox");

    if (lightbox && lightboxImg && closeBtn) {
        document.querySelectorAll(".gallery-item").forEach(item => {
            item.addEventListener("click", function () {
                lightboxImg.src = this.querySelector("img").src;
                lightbox.classList.add("active");
            });
        });

        closeBtn.addEventListener("click", () => {
            lightbox.classList.remove("active");
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) lightbox.classList.remove("active");
        });
    }
});

// Inquiry Form - Save to localStorage
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const inquiry = {
                fullName: document.querySelector('input[placeholder="Juan Dela Cruz"]').value,
                email: document.querySelector('input[type="email"]').value,
                contact: document.querySelector('input[type="tel"]').value,
                destination: document.querySelector('select').value,
                travelDate: document.querySelector('input[type="date"]').value,
                visitors: document.querySelector('input[type="number"]').value,
                message: document.querySelector("textarea").value,
                time: new Date().toLocaleString()
            };

            let inquiries = JSON.parse(localStorage.getItem("inquiries")) || [];
            inquiries.push(inquiry);
            localStorage.setItem("inquiries", JSON.stringify(inquiries));

            alert("Thank you for your inquiry! Your request has been successfully submitted and saved.");
            this.reset();
        });
    }
});

// Destinations Data
const destinations = [
    { name: "Buluan Island", city: "Ipil", cat: "Island", img: "images/buluansanctuary.png", fee: "Free", desc: "Unspoiled white sand island perfect for snorkeling." },
    { name: "Linguisan Beach", city: "Guicam", cat: "Beach", img: "images/linguisan.png", fee: "₱30", desc: "A serene coastal getaway with pristine shoreline." },
    { name: "Mount Gampoy", city: "Malangas", cat: "Mountain", img: "images/gampoy.png", fee: "₱50", desc: "A prominent highland destination for hiking adventures." },
    { name: "Talisay Heights Restaurant", city: "Ipil", cat: "Restaurant", img: "images/talisay heights.png", fee: "Varies", desc: "Premier establishment with cafe, restaurant, and function hall." },
    { name: "Malagandis Falls", city: "Titay", cat: "Waterfall", img: "images/malagandis.png", fee: "Free", desc: "Refreshing natural retreat with cascading waters." },
    { name: "Tungawan Spelunking", city: "Tungawan", cat: "Adventure", img: "images/spelunking.png", fee: "₱100", desc: "Explore hidden subterranean wonders and limestone formations." },
    { name: "Ipil Rotunda Obelisk", city: "Ipil", cat: "Historical Site", img: "images/obelisk.png", fee: "Free", desc: "Iconic landmark symbolizing town progress and identity." }
];

const modalMap = {
    "Buluan Island": "buluanModal",
    "Linguisan Beach": "linguisanModal",
    "Mount Gampoy": "gampoyModal",
    "Talisay Heights Restaurant": "talisayModal",
    "Malagandis Falls": "malagandisModal",
    "Tungawan Spelunking": "spelunkingModal",
    "Ipil Rotunda Obelisk": "obeliskModal"
};

// Render destinations to grid
function renderDestinations(data) {
    const grid = document.getElementById('dest-grid');
    if (!grid) return;
    
    grid.innerHTML = data.map(d => {
        const modalId = modalMap[d.name] || '';
        return `<div class="col-sm-10 col-md-6 col-lg-4">
            <div class="card h-100 shadow border-0 overflow-hidden">
                <img src="${d.img}" class="card-img-top" alt="${d.name}">
                <div class="card-body d-flex flex-column align-items-center justify-content-center text-center">
                    <h5 class="fw-bold">${d.name}</h5>
                    <p class="text-muted small"><i class="fas fa-map-marker-alt text-danger me-1"></i> ${d.city} | ${d.cat}</p>
                    <button class="btn btn-outline-success w-100 fw-bold" data-bs-toggle="modal" data-bs-target="#${modalId}">View Details</button>
                </div>
            </div>
        </div>`;
    }).join('');
}

// Filter destinations
function filterDestinations() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || 'All';
    
    const filtered = destinations.filter(d => {
        const nameMatches = searchTerm === '' || d.name.toLowerCase().includes(searchTerm);
        const categoryMatches = category === 'All' || d.cat === category;
        return nameMatches && categoryMatches;
    });
    
    renderDestinations(filtered);
}

// Initialize destinations
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('dest-grid')) {
        renderDestinations(destinations);
        document.getElementById('searchInput')?.addEventListener('input', filterDestinations);
        document.getElementById('categoryFilter')?.addEventListener('change', filterDestinations);
    }
});

// Show destination details modal
function showDestinationDetails(i) {
    if (i >= destinations.length) return;
    const d = destinations[i];
    document.getElementById('m-title').innerText = d.name;
    document.getElementById('m-body').innerHTML = `
        <img src="${d.img}" class="img-fluid rounded mb-3 w-100 shadow">
        <p><strong>Description:</strong> ${d.desc}</p>
        <p><strong>Entrance Fee:</strong> ${d.fee}</p>
        <div class="alert alert-info"><strong>Travel Tip:</strong> Wear sunscreen and bring your own reusable water bottle.</div>`;
    new bootstrap.Modal(document.getElementById('detailsModal')).show();
}
