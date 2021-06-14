module.exports = (Sequelize, Schema) => {
    const Bidding = Schema.define("bidding", {
        category           : { type: Sequelize.STRING, required: true, defaultValue: "" },
        uom                : { type: Sequelize.STRING, required: true, defaultValue: "" },
        bid_date           : { type: Sequelize.DATEONLY, required: true},
        start_date_time    : { type: Sequelize.DATE, required: true},
        end_date_time      : { type: Sequelize.DATE, required: true},
        price              : { type: Sequelize.STRING, required: true, defaultValue: "" },
        product            : { type: Sequelize.STRING, required: true, defaultValue: "" },
        qty                : { type: Sequelize.STRING, required: true, defaultValue: "" },
        status             : { type: Sequelize.INTEGER,enum:[0,1], defaultValue : 0 }
    });
    Bidding.sync({ force: false, alter: true });
    return Bidding;
  };