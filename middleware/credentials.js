const allowedOrigins = [
    'https://trace_cocoa.onrender.com',
    'https://trace-cocoa.onrender.com',
    'http://localhost:3000',
    'https://coco-ydre.onrender.com'
];
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials',true);
    }
    next();
}

module.exports = credentials;
