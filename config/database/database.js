const mysql = require('mysql2')
function connect() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'nguyenngocminh'
    });
    connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.');
    });
    // $query = 'SELECT*FROM companies';
    // connection.query($query, function (err, rows) {
    //     if (err) {
    //         console.log('error: ' + err.message);
    //     } else {
    //         console.log(" Query successfully:", rows);
    //     }
    // })
}
module.exports = connect;