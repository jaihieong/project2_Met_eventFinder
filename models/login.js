module.exports = function(sequelize, DataTypes) {
  var Login = sequelize.define("Login", {
    // Giving the Login model a name of type STRING
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  // //relating the table with Register table
  // Login.associate = function(models) {
  //   // Associating Login with Posts
  //   // When an Login is deleted, also delete any associated Posts
  //   Login.belongsTo(models.Register, {
  //       foreignKey: {
  //           allowNull: false
  //       },
  //       onDelete: "cascade"
  //   });
  // };

  return Login;
};
