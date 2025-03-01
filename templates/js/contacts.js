const contacts = [
    { name: "City Blood Bank", phone: "+91 9876543210", location: "Mumbai", type: "blood bank" },
    { name: "Red Cross Center", phone: "+91 8765432109", location: "Delhi", type: "blood bank" },
    { name: "Global Blood Donation", phone: "+91 7654321098", location: "Bangalore", type: "blood bank" },

    { name: "Father - Rajesh Sharma", phone: "+91 9898989898", location: "Home", type: "parent" },
    { name: "Mother - Sunita Sharma", phone: "+91 9789789789", location: "Home", type: "parent" }
];

function displayContacts(filteredContacts) {
    const list = document.getElementById("contactsList");
    list.innerHTML = "";
    filteredContacts.forEach(contact => {
        list.innerHTML += `
            <li class="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                    <p class="font-bold text-gray-700">${contact.name}</p>
                    <p class="text-gray-500">${contact.location}</p>
                    <a href="tel:${contact.phone}" class="text-red-500">📞 ${contact.phone}</a>
                </div>
            </li>
        `;
    });
}

document.getElementById("search").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = contacts.filter(contact => contact.name.toLowerCase().includes(value));
    displayContacts(filtered);
});

// Load contacts on page load
document.addEventListener("DOMContentLoaded", () => displayContacts(contacts));
