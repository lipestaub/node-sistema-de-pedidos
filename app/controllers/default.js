module.exports.redirectToLogin = function (application, req, res) {
    res.redirect('/login');
}

module.exports.showLoginPage = function (application, req, res) {
    res.render('default/login', {errors: {}, data: {}});
}