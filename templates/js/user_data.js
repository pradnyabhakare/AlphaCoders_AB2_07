// Array of user information
const users = [
    {
        username: "rahul_sharma123",
        fname: "Rahul",
        mname: "Kumar",
        lname: "Sharma",
        blood_type: "O+",
        location: "Mumbai, India",
        contacts: "+91 9876543210",
        coords: [19.0760, 72.8777], // Mumbai location
        past_donation: {
            where: "to XYZ Blood Bank",
            for: "Blood Bank",
            unit: "100ml",
        }
    },
    {
        username: "ananya_patel456",
        fname: "Ananya",
        mname: "Ramesh",
        lname: "Patel",
        blood_type: "A-",
        location: "Delhi, India",
        contacts: "+91 9898989898",
        coords: [28.6139, 77.2090], // Delhi location
        past_donation: {
            where: "to ABC Blood Bank",
            for: "Hospital",
            unit: "200ml",
        }
    }
];

// Select a user (Modify index to choose which user to display)
const selectedUser = users[0]; // Change to users[1] for second user

// Function to populate user details dynamically
function populateUserDetails() {
    document.getElementById("user-name").textContent = `${selectedUser.fname} ${selectedUser.lname}`;
    document.getElementById("blood-type").textContent = selectedUser.blood_type;
    document.getElementById("location").textContent = selectedUser.location;
    document.getElementById("contact").textContent = selectedUser.contacts;

    // Initialize the map after loading details
    initLeafletMap(selectedUser.coords);
}

// Function to initialize Leaflet map
function initLeafletMap(coords) {
    const map = L.map('map').setView(coords, 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add patient marker
    addMarker(map, coords, "Patient's Location");
}

// Function to add a marker
function addMarker(map, coords, popupText) {
    L.marker(coords).addTo(map).bindPopup(popupText).openPopup();
}

// Ensure the details are populated once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", populateUserDetails);