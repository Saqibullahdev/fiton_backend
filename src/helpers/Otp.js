module.exports.generateOTP = function () {
    return Math.floor(100000 + Math.random() * 900000);
}


function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

console.log(generateOTP());