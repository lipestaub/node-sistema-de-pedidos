module.exports = function (application) {
    application.post('/validate-user', function (req, res) {
        application.app.controllers.user.validateUser(application, req, res);
    });

    application.get('/register-new-client', function (req, res) {
        application.app.controllers.user.showClientRegistrationForm(application, req, res);
    });

    application.post('/register-new-client', function (req, res) {
        application.app.controllers.user.registerClient(application, req, res);
    });
}