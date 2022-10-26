const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: {
            msg: "The user must not contain spaces"
        },
        len: {
            args: [6,50],
            msg: "The user must only contain at least six letters"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
            args: [2,50],
            msg: "The name must only contain at least two letters"
        }
      }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,

    },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [6, 255],
            msg: "The password length should be between 6 and 255 characters.",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^((\+|)[0-9]{1,3}(-|\s)[0-9]{2,4}(-|\s)[0-9]{6,8})$/,
            msg: "Enter a valid phone",
          },
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isBarber: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      addProduct: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deleteProduct: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
