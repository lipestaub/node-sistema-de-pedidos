class User {
    constructor(connection) {
        this._connection = connection;
        this._crypto = require('crypto');
    }

    getUserByEmailAndPassword(data, callbackFunction) {
        const encriptedPassword = this._crypto.createHash('md5').update(data.password).digest('hex');
        this._connection.query(`SELECT * FROM user WHERE email = '${data.email}' AND password = '${encriptedPassword}';`, callbackFunction);
    }
}

module.exports = function () {
    return User;
}