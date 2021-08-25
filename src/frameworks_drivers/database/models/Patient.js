module.exports = (sequelize, type) => {
    return sequelize.define('Patient', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        age: {
            type: type.STRING,
            allowNull: false
        },
        height: {
            type: type.STRING,
            allowNull: false
        },
        weight: {
            type: type.STRING,
            allowNull: false
        }
    },{
        freezTableName: true,
        updatedAt: false,
        createdAt: false
    })
}