module.exports = (Sequelize, Schema) => {
    const EnquiryForm = Schema.define("enquiryform", {
        buss_interest   : { type: Sequelize.STRING, required: true, defaultValue: "" },
        name            : { type: Sequelize.TEXT, required: true, defaultValue: "" },
        add             : { type: Sequelize.TEXT, required: true, defaultValue: "" },
        mobile          : { type: Sequelize.STRING, required: true, defaultValue: "", match: [/([6-9]{1}[0-9]{9})$/, "Please enter valid mobile number"] },
        email           : { type: Sequelize.STRING, required: true, defaultValue: "", match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please enter valid email",] },
        reason          : { type: Sequelize.STRING, required: true, defaultValue: "" },
    });
    EnquiryForm.sync({ force: false, alter: true });
    return EnquiryForm;
  };
  