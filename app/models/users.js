module.exports = function(sequelize, DataTypes) {

  let User = sequelize.define("User", {

    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    fbID: {
      type: DataTypes.STRING,
      allowNull: true

    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
        validate:{
          isEmail: true
        }
}
  });
  return User;
};
