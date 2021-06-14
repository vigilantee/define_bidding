module.exports = (Sequelize, Schema) => {
    const Farmer = Schema.define("farmer", {
        farmer_name         : { type: Sequelize.STRING, required: true, defaultValue: "" },
        farmer_add          : { type: Sequelize.TEXT,   required: true, defaultValue: "" },
        farmer_pin_code     : { type: Sequelize.STRING, required: true, defaultValue: "", max: [6, "Pincode maximum 6 characters"] },
        farmer_contact_no   : { type: Sequelize.STRING, required: true, defaultValue: "", match: [/([6-9]{1}[0-9]{9})$/, "Please enter valid mobile number"] },
        farmer_email_id     : { type: Sequelize.STRING, required: true, defaultValue: "", match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please enter valid email",] },
        farmer_bank_acc_no  : { type: Sequelize.STRING, required: true, defaultValue: "" },
        farmer_ifsc         : { type: Sequelize.STRING, required: true, defaultValue: "" },
        farmer_branch       : { type: Sequelize.STRING, required: true, defaultValue: "" },
        farmer_pan_no       : { type: Sequelize.STRING, defaultValue: "" },
        farmer_aadhaar_no   : { type: Sequelize.STRING, required: true, defaultValue: "" },
        farmer_user_id      : { type: Sequelize.STRING, required: true, defaultValue: "" },
        farmer_password     : { type: Sequelize.STRING, required: true, defaultValue: "" },
        // Documents Column
        aadhaar_image       : { type: Sequelize.TEXT,   required: true, defaultValue: "" },
        pan_image           : { type: Sequelize.TEXT,   defaultValue: "" },
        cheque_passbook_cpy : { type: Sequelize.TEXT,   defaultValue: "" },
        seven_12            : { type: Sequelize.TEXT,   defaultValue: "" },
        farmer_status       : { type: Sequelize.INTEGER,enum:[0,1], defaultValue : 0 }
    });
    Farmer.sync({ force: false, alter: true });
    return Farmer;
  };
  