export const bloodBank = {
    id: BB_1001,
    name: "City Blood Bank",
    contact: "+91 9876543210",
    location: {
        latitude: 19.0760,
        longitude: 72.8777
    },
    availability: {
        A_Positive: 10,
        B_Positive: 5,
        O_Positive: 8,
        AB_Positive: 4,
        A_Negative: 2,
        B_Negative: 1,
        O_Negative: 3,
        AB_Negative: 0
    },
    requests: [
        {
            id: 101,
            patientName: "Rahul Sharma",
            bloodType: "O+",
            contact: "+91 9876543201",
            location: "Fortis Hospital, Mumbai"
        },
        {
            id: 102,
            patientName: "Priya Verma",
            bloodType: "A-",
            contact: "+91 9823456789",
            location: "Apollo Hospital, Mumbai"
        }
    ]
};
