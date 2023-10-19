const application = require('./config/server')();

application.listen(80, function () {
    console.log('Server running!');
})