module.exports = (sequelize, type) => {
    return sequelize.define('User', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_name: {
            type: type.STRING,
            allowNull: false
        },
        user_age: {
            type: type.STRING,
            allowNull: false
        },
        user_gender: {
            type: type.STRING,
            allowNull: false
        },
        user_email: {
            type: type.STRING,
            allowNull: false
        },
        user_dob: {
            type: type.STRING,
            allowNull: false
        },
        user_password: {
            type: type.STRING,
            allowNull: false
        },
        user_mobileno: {
            type: type.STRING,
            allowNull: false
        },
        user_city: {
            type: type.STRING,
            allowNull: false
        },
        token: {
            type: type.STRING,
            allowNull: false
        },
    },{
        freezTableName: true,
        updatedAt: false,
        createdAt: false
    })
}