const sequelize = require('../../frameworks_drivers/database/sequelize')
const _ = require('lodash')

module.exports = class {
    constructor() {
        this.db = sequelize
        this.model = this.db.model('Doctor')
    }
    async add(doctorEntity) {
        const err = []
        const { name, age,spelization } = doctorEntity
        if (_.isUndefined(name) || _.isNull(name)) err.push("doctor name is required in field 'student_name'")
        if (_.isUndefined(age) || _.isNull(age)) err.push("age is required in field 'student_mark'")

        if (err.length > 0) return err
        else {
            return await this.model.create({ name, age,spelization }, { raw: true })
        }


    }

    async update(id, doctorEntity) {
        const err = []
        const { name, age,spelization } = doctorEntity
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