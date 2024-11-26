import mysql from "mysql2/promise";

const config = {
    host: "mysqldb",
    user: "root",
    port: 3306,
    password: "12345",
    database: "todo_list"
};

const connection = await mysql.createConnection(config);

export default connection;
