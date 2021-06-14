module.exports = (Sequelize, Schema) => {
    const Broker = Schema.define("broker", {
        registration_status         : { type: Sequelize.INTEGER.UNSIGNED.ZEROFILL, enum:[1,2,3], comment: '1=Individual,2=Proprietorship,3=Partnership'},
        name_firm_name              : { type: Sequelize.STRING, required: true, defaultValue: "" },
        broker_full_address         : { type: Sequelize.TEXT, required: true, defaultValue: ""},
        broker_pin_code             : { type: Sequelize.STRING(55), required: true, defaultValue: "", max: [6, "Pincode maximum 6 characters"] },
        broker_contact_person       : { type: Sequelize.STRING, required: true, defaultValue: "" },
        broker_contact_no           : { type: Sequelize.STRING(55), required: true, defaultValue: "", match: [/([6-9]{1}[0-9]{9})$/, "Please enter valid mobile number"] },
        broker_email_id             : { type: Sequelize.STRING, required: true, defaultValue: "", match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please enter valid email",] },
        broker_bank_acc_no          : { type: Sequelize.STRING, required: true, defaultValue: "", match: [/([0-9]{10,15})$/, "Please enter valid account number"] },
        broker_ifsc                 : { type: Sequelize.STRING, required: true, defaultValue: "" },
        broker_branch               : { type: Sequelize.STRING, required: true, defaultValue: "" },
        broker_aadhaar_no           : { type: Sequelize.STRING, required: true, defaultValue: "" },
        broker_pan_no               : { type: Sequelize.STRING, defaultValue: "", required: true },
        broker_gst_no               : { type: Sequelize.STRING, defaultValue: "" },
        broker_firm_reg_no          : { type: Sequelize.STRING, defaultValue: "" },
        broker_user_id              : { type: Sequelize.STRING, required: true, defaultValue: "" },
        broker_password             : { type: Sequelize.STRING, required: true, defaultValue: "" },
        // Documents Column
        aadhaar_image               : { type: Sequelize.TEXT, defaultValue: "" },
        pan_image                   : { type: Sequelize.TEXT, defaultValue: "" },
        cancel_cheque               : { type: Sequelize.TEXT, defaultValue: "" },
        firm_reg_doc                : { type: Sequelize.TEXT, defaultValue: "" },
        gst_reg                     : { type: Sequelize.TEXT, defaultValue: "" },
        broker_status               : { type: Sequelize.INTEGER,enum:[0,1], defaultValue : 0 }
    });
    Broker.sync({ force: false, alter: true });
    return Broker;
  };
  