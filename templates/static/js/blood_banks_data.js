const bloodBanks = [
    {
        id: "BB_1001",
        name: "City Blood Bank",
        location: "18,17",
        contact: "+91 9876543210",
        availability: {
            A_Positive: 10,
            B_Positive: 5,
            O_Positive: 8,
            AB_Positive: 4,
            A_Negative: 2,
            B_Negative: 1,
            O_Negative: 3,
            AB_Negative: 0
        }
    },
    {
        id: "BB_1002",
        name: "Metro Blood Bank",
        location: "Bandra, Mumbai",
        contact: "+91 9123456789",
        availability: {
            A_Positive: 6,
            B_Positive: 7,
            O_Positive: 12,
            AB_Positive: 3,
            A_Negative: 1,
            B_Negative: 2,
            O_Negative: 0,
            AB_Negative: 1
        }
    }
];

async function fetchBloodBanks() {
    try {
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        const apiUrl = `${baseUrl}/user/api/bloodbanks/`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch blood bank details");
        }

        const bloodBanks = await response.json();
        console.log(bloodBanks); // Logs the fetched data
        return bloodBanks;
    } catch (error) {
        console.error("Error fetching blood banks:", error);
        return [];
    }
}

function loadBloodBanks() {
    const bankListContainer = document.getElementById("blood-bank-list");
    bankListContainer.innerHTML = "";
    
    fetchBloodBanks().then(data => {
        console.log("Blood Banks:", data);
        
        data.forEach(bank => {
            const [lat, lng] = bank.location.split(",");
            
            const bankElement = document.createElement("div");
            bankElement.classList.add("p-4", "bg-white", "shadow-md", "rounded-md", "mb-4");
            
            bankElement.innerHTML = `
                <h2 class='text-lg font-bold text-red-500'>${bank.name}</h2>
                <p class='text-gray-700'><strong>Contact:</strong> ${bank.contact}</p>
                <button class='mt-2 bg-red-500 text-white px-4 py-2 rounded-md' onclick='requestBlood("${bank.name}")'>Request Blood</button>
                <button class='mt-2 bg-red-500 text-white px-4 py-2 rounded-md' onclick="window.location.href='https://www.google.com/maps?q=${lat},${lng}'">Show on Maps</button>
            `;
            
            bankListContainer.appendChild(bankElement);
        });
    });
}


document.addEventListener("DOMContentLoaded", loadBloodBanks);

function requestBlood(bankName) {
    alert(`Blood request sent to ${bankName}`);
}
