// Sample student data
const students = [
  { name: 'Student 1', university: 'University A', lat: 23.001, lng: 91.967 },
  { name: 'Student 2', university: 'University B', lat: 23.025, lng: 91.965 },
  // Add more students as needed
];

// Initialize the map
const map = L.map('map').setView([23.001, 91.967], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add student markers to the map
students.forEach(student => {
  L.marker([student.lat, student.lng])
    .addTo(map)
    .bindPopup(`<b>${student.name}</b><br>${student.university}`);
});
