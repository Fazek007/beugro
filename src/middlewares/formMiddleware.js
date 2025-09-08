function formMiddleware(req, res, next){
    res.send('<h1>Welcome to my site</h1><p>This is the main page.</p>');
    next()
}

module.exports = formMiddleware