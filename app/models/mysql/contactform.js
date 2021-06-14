module.exports = (Sequelize, Schema) => {
    const ContactForm = Schema.define("contactform", {
        fname           : { type: Sequelize.STRING, required: true, defaultValue: "" },
        lname           : { type: Sequelize.STRING, required: true, defaultValue: "" },
        message         : { type: Sequelize.TEXT, required: true, defaultValue: "" },
        email           : { type: Sequelize.STRING, required: true, defaultValue: "", match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please enter valid email",] },
        reason          : { type: Sequelize.TEXT, required: true, defaultValue: "" },
    });
    ContactForm.sync({ force: false, alter: true });
    return ContactForm;
  };
  