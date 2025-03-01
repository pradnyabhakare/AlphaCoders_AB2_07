self.addEventListener("push", function (event) {
    const data = event.data.json();
    self.registration.showNotification("🚨 SOS Blood Request!", {
        body: `Location: ${data.location}\nBlood Type: ${data.blood_type}\nInfo: ${data.info}`,
        icon: "/static/icons/sos.png" // Adjust icon path if needed
    });
});

// Handle notification clicks (optional)
self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow("/user")
    );
});
