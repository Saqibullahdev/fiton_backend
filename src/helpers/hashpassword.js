// const argon2 = require('argon2');

const bcrypt = require('bcrypt');

// async function hashPassword(password) {
    
// }


// Function to hash a password using Argon2
async function hashPassword(password) {
    const saltRounds = 10; // You can adjust the salt rounds based on your security needs
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }




    // try {
    //     // Generate a hash for the password
    //     const hash = await argon2.hash(password);
    //     return hash; // Return the hashed password
    // } catch (error) {
    //     throw new Error(error.message || "error while hashing"); // Handle error
    // }
}

async function verifyPassword(plainPassword, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error verifying password');
    }
}



module.exports = {
    hashPassword,
    verifyPassword
};