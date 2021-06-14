module.exports = (Sequelize, Schema) => {
    const Trader = Schema.define("trader", {
        category                    : { type: Sequelize.INTEGER.UNSIGNED.ZEROFILL, enum:[1,2], comment: '1=Customer,2=Supplier/Vendor'},
        registration_status         : { type: Sequelize.INTEGER.UNSIGNED.ZEROFILL, enum:[1,2,3,4], comment: '1=Individual,2=Proprietorship,3=Partnership,4=Company'},
        name_firm_name              : { type: Sequelize.STRING, required: true, defaultValue: "" },
        trader_full_address         : { type: Sequelize.TEXT, required: true, defaultValue: ""},
        trader_pin_code             : { type: Sequelize.STRING(55), required: true, defaultValue: "", max: [6, "Pincode maximum 6 characters"] },
        trader_contact_person       : { type: Sequelize.STRING, required: true, defaultValue: "" },
        trader_contact_no           : { type: Sequelize.STRING(55), required: true, defaultValue: "", match: [/([6-9]{1}[0-9]{9})$/, "Please enter valid mobile number"] },
        trader_email_id             : { type: Sequelize.STRING, required: true, defaultValue: "", match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please enter valid email",] },
        trader_bank_acc_no          : { type: Sequelize.STRING, required: true, defaultValue: "", match: [/([0-9]{10,15})$/, "Please enter valid account number"] },
        trader_ifsc                 : { type: Sequelize.STRING, required: true, defaultValue: "" },
        trader_branch               : { type: Sequelize.STRING, required: true, defaultValue: "" },
        trader_aadhaar_no           : { type: Sequelize.STRING, required: true, defaultValue: "" },
        trader_pan_no               : { type: Sequelize.STRING, defaultValue: "", required: true },
        trader_gst_no               : { type: Sequelize.STRING, defaultValue: "" },
        trader_fssai_lic_no         : { type: Sequelize.STRING, defaultValue: "" },
        trader_valid_upto           : { type: Sequelize.STRING, defaultValue: "" },
        trader_cdn                  : { type: Sequelize.STRING, defaultValue: "" },
        trader_tan                  : { type: Sequelize.STRING, defaultValue: "" },
        trader_msme_reg_no          : { type: Sequelize.STRING, defaultValue: "" },
        trader_mandi_lic_no         : { type: Sequelize.STRING, defaultValue: "" },
        trader_user_id              : { type: Sequelize.STRING, required: true, defaultValue: "" },
        trader_password             : { type: Sequelize.STRING, required: true, defaultValue: "" },
        // Documents Column
        aadhaar_image               : { type: Sequelize.TEXT, defaultValue: "" },
        pan_image                   : { type: Sequelize.TEXT, defaultValue: "" },
        cancel_cheque               : { type: Sequelize.TEXT, defaultValue: "" },
        firm_reg_doc                : { type: Sequelize.TEXT, defaultValue: "" },
        gst_reg                     : { type: Sequelize.TEXT, defaultValue: "" },
        fssai_reg                   : { type: Sequelize.TEXT, defaultValue: "" },
        tds_tcs_challan             : { type: Sequelize.TEXT, defaultValue: "" },
        cdn_certi                   : { type: Sequelize.TEXT, defaultValue: "" },
        msme_certi                  : { type: Sequelize.TEXT, defaultValue: "" },
        mandi_lic_doc               : { type: Sequelize.TEXT, defaultValue: "" },
        trader_status               : { type: Sequelize.INTEGER,enum:[0,1], defaultValue : 0 }
    });
    Trader.sync({ force: false, alter: true });
    return Trader;
  };
  