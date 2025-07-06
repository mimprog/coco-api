const fs = require('fs');
const path = require('path');

// Maps to ensure consistency and uniqueness
const nameCodeMap = new Map();
const prefixCounterMap = new Map();

// Function to generate producer code
function generateProducerCode(name) {
    if (!name) return 'USER000';

    const fullNameRaw = name.toString().toUpperCase().replace(/\s+/g, '');
    const prefix = fullNameRaw.substring(0, 4).padEnd(4, 'X');

    // Return existing code if already mapped
    if (nameCodeMap.has(fullNameRaw)) {
        return nameCodeMap.get(fullNameRaw);
    }

    // Else, generate new code
    const currentCount = prefixCounterMap.get(prefix) || 0;
    const code = `${prefix}${String(currentCount).padStart(3, '0')}`;
    nameCodeMap.set(fullNameRaw, code);
    prefixCounterMap.set(prefix, currentCount + 1);

    return code;
}

// Load GeoJSON file
const filePath = path.join(__dirname, 'resources/geojson/geodatas-gps.geojson');
const geojson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Process each feature
geojson.features.forEach(feature => {
    const name = feature.properties.name || '';
    const producerCode = generateProducerCode(name);
    feature.properties.producerCode = producerCode;
    console.log(`.. Added code ${producerCode} for name "${name}"`);
});

// Write updated GeoJSON
fs.writeFileSync(filePath, JSON.stringify(geojson, null, 2));

console.log('✅ GeoJSON updated with consistent producerCode.');

