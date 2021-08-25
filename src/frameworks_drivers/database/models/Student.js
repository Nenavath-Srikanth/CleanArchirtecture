module.exports = (sequelize, type) => {
    return sequelize.define('Student', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        student_name: {
            type: type.STRING,
            allowNull: false
        },
        student_mark: {
            type: type.STRING,
            allowNull: false
        }
    },{
        freezTableName: true,
        updatedAt: false,
        createdAt: false
    })
}