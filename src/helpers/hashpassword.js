const argon2 = require('argon2');

// Function to hash a password using Argon2
async function hashPassword(password) {
    try {
        // Generate a hash for the password
        const hash = await argon2.hash(password);
        return hash; // Return the hashed password
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Hashing failed'); // Handle error
    }
}

module.exports = {
    hashPassword
};