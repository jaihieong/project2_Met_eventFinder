module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
      author: DataTypes.STRING,
      body: DataTypes.STRING
    });
    return Comment;

    //perhaps relate this table with the user if possible
};