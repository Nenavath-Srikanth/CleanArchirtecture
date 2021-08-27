module.exports = (sequelize, type) => {
    return sequelize.define('ImageViewData', {
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
        },
        textarea: {
            type: type.STRING,
            allowNull: false
        },
        status: {
            type: type.STRING,
            allowNull: false
        },

        // Pending: {
        //     type: type.BOOLEAN,
        //     allowNull: false
        // }, 
        // Approved: {
        //     type: type.BOOLEAN,
        //     allowNull: false
        // },  
        // Denied: {
        //     type: type.BOOLEAN,
        //     allowNull: false
        // },
        // Cleared: {
        //     type: type.BOOLEAN,
        //     allowNull: false
        // }
        
    },{
        freezTableName: true,
        updatedAt: false,
        createdAt: false
    })
}