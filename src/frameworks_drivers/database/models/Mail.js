module.exports = (sequelize, type) => {
    return sequelize.define('Mail', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: type.STRING,
            allowNull: false
        },
        text: {
            type: type.STRING,
            allowNull: false
        }
    },{
        freezTableName: true,
        updatedAt: false,
        createdAt: false
    })
}