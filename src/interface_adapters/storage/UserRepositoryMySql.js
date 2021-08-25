const sequelize = require('../../frameworks_drivers/database/sequelize')
const _ = require('lodash')

module.exports = class {
    constructor() {
        this.db = sequelize
        this.model = this.db.model('User')
    }
    async add(userEntity) {
        const err = []
        const { user_name,user_age,user_gender,user_email,user_dob,user_password,user_mobileno,user_city,token } = userEntity
        // if (_.isUndefined(student_name) || _.isNull(student_name)) err.push("student name is required in field 'student_name'")
        // if (_.isUndefined(student_mark) || _.isNull(student_mark)) err.push("student_mark is required in field 'student_mark'")

        if (err.length > 0) return err
        else {
            return await this.model.create({ user_name,user_age,user_gender,user_email,user_dob,user_password,user_mobileno,user_city,token }, { raw: true })
        }


    }

    async update(id, studentEntity) {
        const err = []
        const { student_name, student_mark } = studentEntity
        if(_.isUndefined(id) || _.isNull(id)) err.push("Cannot update student if Id is not provided. Add id in field 'id'.")
        if (_.isUndefined(student_name) || _.isNull(student_name)) err.push("student name is required in field 'student_name'")
        if (_.isUndefined(student_mark) || _.isNull(student_mark)) err.push("student_mark is required in field 'student_mark'")     
        if(err.length > 0) return err
        return await this.model.update({ student_name, student_mark }, { where: { id }, raw: true })

    }

    async delete(id) {
        if(_.isUndefined(id) || _.isNull(id)) return 'Could not delete student without id'
        return await this.model.destroy({ where: { id } })
            
    }

    async getAll() {
        return await this.model.findAll()
    }

    async findOne(userEntity) {
        const err = []
        const  { user_email, user_password  } = userEntity


        if(_.isUndefined(user_email) || _.isNull(user_email)) return 'Could not Find user in db,no such user exist'
        if(_.isUndefined(user_password) || _.isNull(user_password)) return 'password is reuired'

        if (err.length > 0) return err
        else {
            const v1=this.model.findAll({ where: { user_email } })
        return await this.model.findAll({ where: { user_email } })



        
        }
    }
}
