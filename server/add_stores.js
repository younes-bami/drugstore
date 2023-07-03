// Connect to the MongoDB Atlas Cluster
conn = new Mongo("mongodb+srv://younes:Azerty00@cluster0.bmd5xtz.mongodb.net/");
db = conn.getDB("dstore");

// Insert 5 drugstore documents
db.drugstores.insertMany([
    {
        name: "Drugstore 1",
        address: "123 Main St, City A",
        coordinates: { latitude: 40.7128, longitude: -74.0060 },
        openSlots: [
            { from: "2023-01-01", to: "2023-01-07" }
        ],
        profilePicture: "path/to/image1.jpg"
    },
    {
        name: "Drugstore 2",
        address: "456 Elm St, City B",
        coordinates: { latitude: 40.7138, longitude: -74.0070 },
        openSlots: [
            { from: "2023-01-08", to: "2023-01-14" }
        ],
        profilePicture: "path/to/image2.jpg"
    },
    {
        name: "Drugstore 3",
        address: "789 Oak St, City C",
        coordinates: { latitude: 40.7148, longitude: -74.0080 },
        openSlots: [
            { from: "2023-01-15", to: "2023-01-21" }
        ],
        profilePicture: "path/to/image3.jpg"
    },
    {
        name: "Drugstore 4",
        address: "321 Pine St, City D",
        coordinates: { latitude: 40.7158, longitude: -74.0090 },
        openSlots: [
            { from: "2023-01-22", to: "2023-01-28" }
        ],
        profilePicture: "path/to/image4.jpg"
    },
    {
        name: "Drugstore 5",
        address: "654 Maple St, City E",
        coordinates: { latitude: 40.7168, longitude: -74.0100 },
        openSlots: [
            { from: "2023-01-29", to: "2023-02-04" }
        ],
        profilePicture: "path/to/image5.jpg"
    }
]);

print("5 drugstores have been added.");
