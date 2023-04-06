function pickRandomKey(obj) {
    const keys = Object.keys(obj);
    const randomIndex = Math.floor(Math.random() * keys.length);
    
    return keys[randomIndex];
}

module.exports = {pickRandomKey};