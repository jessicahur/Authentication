function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); } //if authenticated, pass control to the next handler, which is employeeRouter (in app.js)
    res.redirect('/login');
}
module.exports = ensureAuthenticated;
