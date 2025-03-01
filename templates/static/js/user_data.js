// Array of user information
const users = [
{
  "user_full_name": "Tushar Neje",
  "user_contact_information": "7028573950",
  "blood_type": "A+",
  "unit": "450",
  "request_type": "Urgent",
  "request_location": "18.45829,73.866242",
  "location": [18.45829, 73.866242]
},
{
  "user_full_name": "Tushar Neje",
  "user_contact_information": "7028573950",
  "blood_type": "A+",
  "unit": "450",
  "request_type": "Urgent",
  "request_location": "18.45829,73.866242",
  "location": [18.45829, 73.866242]
},
{
  "user_full_name": "Tushar Neje",
  "user_contact_information": "7028573950",
  "blood_type": "A+",
  "unit": "450",
  "request_type": "Urgent",
  "request_location": "18.45829,73.866242",
  "location": [18.45829, 73.866242]
},
{
  "user_full_name": "Tushar Neje",
  "user_contact_information": "7028573950",
  "blood_type": "A+",
  "unit": "450",
  "request_type": "Emergency",
  "request_location": "18.45849094334764,73.86612957103003",
  "location": [18.4584909433476, 73.86612957103]
},
{
  "user_full_name": "Tushar Neje",
  "user_contact_information": "7028573950",
  "blood_type": "A+",
  "unit": "450",
  "request_type": "Emergency",
  "request_location": "18.45849094334764,73.86612957103003",
  "location": [18.4584909433476, 73.86612957103]
},
{
  "user_full_name": "Tushar Neje",
  "user_contact_information": "7028573950",
  "blood_type": "A+",
  "unit": "450",
  "request_type": "Emergency",
  "request_location": "18.45849094334764,73.86612957103003",
  "location": [18.4584909433476, 73.86612957103]
},
{
  "user_full_name": "Tushar Neje",
  "user_contact_information": "7028573950",
  "blood_type": "A+",
  "unit": "450",
  "request_type": "Emergency",
  "request_location": "18.45849094334764,73.86612957103003",
  "location": [18.4584909433476, 73.86612957103]
},
{
  "user_full_name": "Tushar Neje",
  "user_contact_information": "7028573950",
  "blood_type": "A+",
  "unit": "450",
  "request_type": "Emergency",
  "request_location": "18.45849094334764,73.86612957103003",
  "location": [18.4584909433476, 73.86612957103]
},
{
  "user_full_name": "Tushar Neje",
  "user_contact_information": "7028573950",
  "blood_type": "A+",
  "unit": "450",
  "request_type": "Emergency",
  "request_location": "18.45849094334764,73.86612957103003",
  "location": [18.4584909433476, 73.86612957103]
}
]

// Object to store initialized map instances
const mapInstances = {};

// Function to populate user details dynamically
function populateUserDetails() {
    const userContainer = document.getElementById("user-details");
    userContainer.innerHTML = ""; // Clear previous content

    users.forEach((user, index) => {
        const userCard = document.createElement("div");
        userCard.classList.add("p-4", "bg-white", "shadow-md", "rounded-md", "mb-4");

        const mapId = `map-${index}`; // Unique map ID for each user

        let userHTML = `
            <h2 class='text-lg font-bold text-red-500'>${user.user_full_name} </h2>
            <p class='text-gray-700'><strong>Blood Type:</strong> ${user.blood_type}</p>
            <p class='text-gray-700'><strong>Contact:</strong> ${user.user_contact_information}</p>
            <p class='text-gray-700'><strong>Blood Unit Required:</strong> ${user.unit} ml</p>
            <p class='text-gray-700'><strong>Request Type:</strong> 
                <span class="${user.request_type === 'Emergency' ? 'text-red-500 font-bold' : 'text-blue-500'}">
                    ${user.request_type}
                </span>
            </p>
            <p class='text-gray-700'><strong>Location:</strong> ${user.location.join(", ")}</p>
            <button class='mt-2 bg-red-500 text-white px-4 py-2 rounded-md' 
                onclick="window.location.href='https://www.google.com/maps?q=${user.location[0]},${user.location[1]}'">
                Show on Maps
            </button>
            <div id="${mapId}" class="h-64 w-full mt-4 rounded-md z-0"></div>
        `;

        userCard.innerHTML = userHTML;
        userContainer.appendChild(userCard);

        // Initialize the map for each user
        setTimeout(() => initLeafletMap(user.location, mapId), 0);
    });
}

// Function to initialize Leaflet map
function initLeafletMap(coords, mapId) {
    // Remove existing map instance if already initialized
    if (mapInstances[mapId]) {
        mapInstances[mapId].remove(); // Remove previous map
        delete mapInstances[mapId]; // Remove reference
    }

    // Initialize a new Leaflet map instance
    const map = L.map(mapId).setView(coords, 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add marker for user's location
    L.marker(coords).addTo(map).bindPopup("User's Location").openPopup();

    // Store map instance
    mapInstances[mapId] = map;
}

// Ensure the details are populated once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", populateUserDetails);
