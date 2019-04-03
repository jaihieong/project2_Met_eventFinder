//Creating "registeres" table in our database which will store user profile
module.exports = function(sequelize, DataTypes) {
  var Register = sequelize.define("Register", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isInt: true
    },
    user_picture: {
      type: DataTypes.BLOB,
      allowNull: false
    },
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
  return Register;
};
