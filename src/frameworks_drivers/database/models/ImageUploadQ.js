module.exports = (sequelize, type) => {
    return sequelize.define('imageData', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        image_filename: {
            type: type.STRING,
            allowNull: false
        },
        image_filepath: {
            type: type.STRING,
            allowNull: false
        },
        image_size: {
            type: type.BIGINT,
            allowNull: false
        },
       image_mimetype: {
            type: type.STRING,
            allowNull: false
        }
    },{
        freezTableName: true,
        updatedAt: false,
        createdAt: false
    })
}