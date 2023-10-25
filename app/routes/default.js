module.exports = function (application) {
    application.get('/', function (req, res) {
        application.app.controllers.default.redirectToLogin(application, req, res);
    });

    application.get('/login', function (req, res) {
        application.app.controllers.default.showLoginPage(application, req, res);
    });
}