if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/templates/static/js/sw.js')
        .then(reg => {
            console.log("Service Worker Registered", reg);
            checkNotificationPermission();
            startSOSPolling();
        })
        .catch(err => console.error("Service Worker Registration Failed", err));
}

// Function to check and request notification permission
function checkNotificationPermission() {
    if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            if (permission !== "granted") {
                console.warn("Notification permission denied.");
            }
        });
    }
}

// Store last notified SOS data to prevent duplicate notifications
let lastNotifiedSOS = new Set();

// Dynamically get host URL
const BASE_URL = `${window.location.protocol}//${window.location.host}`;
const API_URL = `${BASE_URL}/user/api/sos-notifications/`;

// Function to fetch SOS notifications
async function fetchSOSNotifications() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");

        const sosData = await response.json();

        sosData.forEach(sos => {
            const uniqueKey = `${sos.location}-${sos.blood_type}-${sos.info}`;
            
            // Check if this SOS notification is new
            if (!lastNotifiedSOS.has(uniqueKey)) {
                lastNotifiedSOS.add(uniqueKey);
                sendPushNotification(sos);
            }
        });

        // Keep only the last 50 notifications
        if (lastNotifiedSOS.size > 50) {
            lastNotifiedSOS = new Set(Array.from(lastNotifiedSOS).slice(-50));
        }
    } catch (error) {
        console.error("Error fetching SOS notifications:", error);
    }
}

// Function to send push notifications using Service Worker
function sendPushNotification(sos) {
    navigator.serviceWorker.ready.then(reg => {
        reg.showNotification("🚨 SOS Blood Request!", {
            body: `Location: ${sos.location}\nBlood Type: ${sos.blood_type}\nInfo: ${sos.info}`,
            icon: "/static/icons/sos.png"
        });
    });
}

// Start polling the API every 30 seconds
function startSOSPolling() {
    setInterval(fetchSOSNotifications, 30000);
}
