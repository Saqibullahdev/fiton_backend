const rateLimit =require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 20, // Limit each IP to 20 requests per `window` (here, per 5 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: {
        status: 429,
        message: "Too many requests, please try again later.",
        ok: false,
        data: [],
    },
    
})

module.exports=limiter