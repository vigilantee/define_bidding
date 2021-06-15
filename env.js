var envJson =
{
    "localhost": {
        "PORT": "4000",
        "baseUrl": "http://18.220.252.23:4000/",
        "siteName": "Define Softwares",
        "database": {
            "host": "sql6.freemysqlhosting.net",
            "dbname": "sql6419105",
            "username": "sql6419105",
            "password": "hSBsA1ytD5",
            "port": " 3306",
        }
    },
    "development": {
        "PORT": "",
        "baseUrl": "",
        "siteName": "Define Softwares",
        "database": {
            "dbname": "",
            "username": "",
            "password": "",
            "port": "",
            "host": ""
        }
    },
    "staging": {
        "PORT": "",
        "baseUrl": "",
        "siteName": "Define Softwares",
        "database": {
            "dbname": "",
            "username": "",
            "password": "",
            "port": "",
            "host": ""
        }
    },
};

module.exports = () => {
    var env = process.env.NODE_ENV || "localhost";
    // console.log(envJson[env]);
    return envJson[env];
}
