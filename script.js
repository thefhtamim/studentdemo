// Sample student data
const students = [
  { name: 'Student 1', university: 'University A', lat: 23.001, lng: 91.967 },
  { name: 'Student 2', university: 'University B', lat: 23.025, lng: 91.965 },
  // Add more students as needed
];

// Initialize the map with a focus on Bangladesh
const map = L.map('map').setView([23.6850, 90.3563], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add student markers to the map
students.forEach(student => {
  L.marker([student.lat, student.lng])
    .addTo(map)
    .bindPopup(`<b>${student.name}</b><br>${student.university}`);
});

// Populate sidebar with universities
const sidebar = document.getElementById('sidebar');
const universities = Array.from(new Set(students.map(student => student.university)));

// Create a select dropdown for university filtering
const universitySelect = document.createElement('select');
universitySelect.innerHTML = '<option value="">All Universities</option>';
universities.forEach(uni => {
  const option = document.createElement('option');
  option.value = uni;
  option.textContent = uni;
  universitySelect.appendChild(option);
});
sidebar.appendChild(universitySelect);

// Create a search input
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search by Name';
sidebar.appendChild(searchInput);

// Event listener for filtering
function filterStudents() {
  const selectedUniversity = universitySelect.value;
  const searchKeyword = searchInput.value.toLowerCase();

  const filteredStudents = students.filter(student =>
    (selectedUniversity === '' || student.university === selectedUniversity) &&
    (searchKeyword === '' || student.name.toLowerCase().includes(searchKeyword))
  );

  // Clear existing markers
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Add filtered markers to the map
  filteredStudents.forEach(student => {
    L.marker([student.lat, student.lng])
      .addTo(map)
      .bindPopup(`<b>${student.name}</b><br>${student.university}`);
  });
}

// Attach event listeners
universitySelect.addEventListener('change', filterStudents);
searchInput.addEventListener('input', filterStudents);
