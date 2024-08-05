const apiKeyAuth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
        return res.status(401).json({ error: 'API key required' });
    }

    // Replace this with your actual API key or key validation logic
    const validApiKeys = ['your-valid-api-key-1', 'your-valid-api-key-2'];

    if (validApiKeys.includes(apiKey)) {
        next();
    } else {
        res.status(403).json({ error: 'Invalid API key' });
    }
};

export default apiKeyAuth;