class Connection {
    constructor() {
        this._mysql = require('mysql');
    }

    create() {
        return this._mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'order_central'
        });
    }
}

module.exports = function () {
    return Connection;
}