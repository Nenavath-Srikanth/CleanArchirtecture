module.exports = (sequelize, type) => {
    return sequelize.define('Employee', {
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
        salary: {
            type: type.STRING,
            allowNull: false
        }
    },{
        freezTableName: true,
        updatedAt: false,
        createdAt: false
    })
}