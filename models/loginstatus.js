module.exports = function(sequelize, DataTypes) {
    var Loginstatus = sequelize.define("Loginstatus", {
      // Giving the Login model a name of type STRING
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
    return Loginstatus;
}