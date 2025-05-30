const fs = require('fs');
const path = require('path');

// Function to create producer code from name
function generateProducerCode(name) {
    if (!name) return 'USER000';
    const rawName = name.toString().replace(/\s+/g, '');
    const base = rawName.substring(0, 4).toUpperCase();
    return `${base}000`;
}

// Load GeoJSON file
const filePath = path.join(__dirname, 'resources/geojson/geodatas-gps.geojson'); // Adjust path as needed
const geojson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Process each feature
geojson.features.forEach(feature => {
    const name = feature.properties.name || '';
    const producerCode = generateProducerCode(name);
    feature.properties.producerCode = producerCode;
    console.log(`Added code ${producerCode} for name "${name}"`);
});

// Write updated GeoJSON
const outputFilePath = path.join(__dirname, 'resources/geojson/geodatas-gps.geojson');
fs.writeFileSync(outputFilePath, JSON.stringify(geojson, null, 2));

console.log('✅ GeoJSON updated with producerCode.');
