const mysql = require('mysql2')
const { Sequelize } = require('sequelize');
function connect() {
    // const connection = mysql.createConnection({
    //     host: '13.229.180.153',
    //     user: 'mydb',
    //     password: '123456789',
    //     database: 'myjobs'
    // });
    // connection.connect(function(err) {
    //     if (err) {
    //       return console.error('error: ' + err.message);
    //     }
    //     console.log('Connected to the MySQL server.');
    // });
    // $query = 'SELECT*FROM news';
    // connection.query($query, function (err, rows) {
    //     if (err) {
    //         console.log('error: ' + err.message);
    //     } else {
    //         console.log(" Query successfully:", rows);
    //     }
    // })

    // connect server aws
    // const sequelize = new Sequelize(
    //     'myjobs',
    //     'mydb',
    //     '123456789',{
    //         host: '13.229.180.153',
    //         dialect:'mysql', 
    //         logging: false
    //     }
    // );
    // sequelize.authenticate().then(() => {
    //     console.log("connect db successfully");
    // })
    // connect server local
    const sequelize = new Sequelize(
        'my-jobs',
        'root',
        '',{
            host: 'localhost',
            dialect:'mysql', 
            logging: false
        }
    );
    sequelize.authenticate().then(() => {
        console.log("connect db successfully");
    })
}
module.exports = connect;