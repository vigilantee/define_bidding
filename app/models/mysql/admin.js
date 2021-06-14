module.exports = (Sequelize, Schema) => {
    const Admin = Schema.define("admin", {
      username: { type: Sequelize.STRING, defaultValue: "" },
      email: {
        type: Sequelize.STRING,
        defaultValue: "",
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter valid email",
        ],
      },
      password:{ type: Sequelize.STRING, defaultValue: "" }
    });
    
    Admin.sync({ force: false, alter: true });
    return Admin;
  };
  