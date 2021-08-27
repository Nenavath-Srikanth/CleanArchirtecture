const sequelize = require('../../frameworks_drivers/database/sequelize')
const _ = require('lodash')

module.exports = class {
    constructor() {
        this.db = sequelize
        this.model = this.db.model('imageData')
    }
    async add(imageuploadEntity) {
        const err = []
        const { image_filename, image_filepath, image_size, image_mimetype } = imageuploadEntity
       console.log(image_filename)
       if (_.isUndefined(image_filename) || _.isNull(image_filename)) err.push("image_filename is required in field 'image_filename'")
       if (_.isUndefined(image_filepath) || _.isNull(image_filepath)) err.push("image_filepath is required in field 'image_filepath'")
       if (_.isUndefined(image_mimetype) || _.isNull(image_mimetype)) err.push("image_mimetype is required in field 'image_mimetype'")
       if (_.isUndefined(image_size) || _.isNull(image_size)) err.push("image_size is required in field 'image_size'")

      
        if (err.length > 0) return err
        else {
            return await this.model.create({ image_filename, image_filepath, image_mimetype, image_size }, { raw: true })
            }


    }

    async update(id, imageuploadEntity) {
        const err = []
        const { name, age,spelization } = imageuploadEntity
        if(_.isUndefined(id) || _.isNull(id)) err.push("Cannot update city if Id is not provided. Add id in field 'id'.")
        if (_.isUndefined(name) || _.isNull(name)) err.push(" name is required in field 'name'")
        if (_.isUndefined(age) || _.isNull(age)) err.push("age is required in field 'age'")     
        if(err.length > 0) return err
        return await this.model.update({ name, age,spelization }, { where: { id }, raw: true })

    }

    async delete(id) {
        if(_.isUndefined(id) || _.isNull(id)) return 'Could not delete city without id'
        return await this.model.destroy({ where: { id } })
            
    }

    async getAll() {
        return await this.model.findAll()
    }
}