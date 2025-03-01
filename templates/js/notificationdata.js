const data = [
    {
        title: "Blood Donation Camp",
        address: "123 Main St, City Center",
        time: "10:00 AM - 4:00 PM",
        date: "2025-03-01",
        latlng: "40.712776,-74.005974"  // Example coordinates for Community Hall
    },
    {
        title: "Emergency Blood Request",
        address: "45 Health Ave, Downtown",
        time: "24/7",
        date: new Date().toISOString().split('T')[0],
        latlng: "40.730610,-73.935242"  // Example coordinates for City Hospital
    },
    {
        title: "Blood Drive Event",
        address: "78 College Rd, North Side",
        time: "9:00 AM - 5:00 PM",
        date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
        latlng: "40.729515,-73.996460"  // Example coordinates for University Campus
    },
    {
        title: "Mobile Blood Bank",
        address: "200 Park Ave, Midtown",
        time: "12:00 PM - 6:00 PM",
        date: "2025-03-05",
        latlng: "40.754932,-73.984016"  // Example coordinates for Midtown
    },
    {
        title: "Urgent Blood Drive",
        address: "90 West St, Financial District",
        time: "8:00 AM - 2:00 PM",
        date: "2025-03-03",
        latlng: "40.709056,-74.013942"  // Example coordinates for Financial District
    },
    {
        title: "Community Blood Donation",
        address: "55 Wall St, Downtown",
        time: "11:00 AM - 4:00 PM",
        date: "2025-03-07",
        latlng: "40.707491,-74.010267"  // Example coordinates for Downtown
    },
    {
        title: "Blood Donation Awareness Camp",
        address: "500 5th Ave, Uptown",
        time: "10:00 AM - 3:00 PM",
        date: "2025-03-10",
        latlng: "40.752998,-73.984474"  // Example coordinates for Uptown
    }
];
export { data };
