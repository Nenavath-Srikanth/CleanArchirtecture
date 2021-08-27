module.exports = (sequelize, type) => {
    return sequelize.define('Page1', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title     : type.JSONB,
       
        
    },{
        freezTableName: true,
        updatedAt: false,
        createdAt: false
    })
}