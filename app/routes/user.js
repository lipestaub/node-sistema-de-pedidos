module.exports = function (application) {
    application.post('/validate-user', function (req, res) {
        application.app.controllers.user.validateUser(application, req, res);
    });
}