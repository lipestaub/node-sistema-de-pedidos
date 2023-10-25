class User {
    constructor(connection) {
        this._connection = connection;
        this._crypto = require('crypto');
    }

    getUserByEmailAndPassword(data, callbackFunction) {
        const encriptedPassword = this._crypto.createHash('md5').update(data.password).digest('hex');
        this._connection.query(`SELECT * FROM user WHERE email = '${data.email}' AND password = '${encriptedPassword}';`, callbackFunction);
    }

    getUserByEmail(email, callbackFunction) {
        this._connection.query(`SELECT * FROM user WHERE email = '${email}';`, callbackFunction);
    }

    registerClient(data, callbackFunction) {
        const encriptedPassword = this._crypto.createHash('md5').update(data.password).digest('hex');
        this._connection.query(`INSERT INTO user VALUES(null, '${data.name}', '${data.email}', '${encriptedPassword}', 1);`, callbackFunction);
    }
}

module.exports = function () {
    return User;
}