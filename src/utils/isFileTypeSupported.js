const isFileTypeSupported=(fileType, supportedTypes=['png', 'jpg', 'jpeg'])=> {
    return supportedTypes.includes(fileType);
}

module.exports = isFileTypeSupported;