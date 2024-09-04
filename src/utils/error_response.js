function errorResponse(reasonPhrase, error) {
    return {
            success: false,
            data: {},
            message: reasonPhrase,
            error: error,
            ok: false,
        }
}

module.exports = errorResponse;