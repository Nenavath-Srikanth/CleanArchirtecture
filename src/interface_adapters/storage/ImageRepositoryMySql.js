const sequelize = require('../../frameworks_drivers/database/sequelize')
const _ = require('lodash')

module.exports = class {
    constructor() {
        this.db = sequelize
        this.model = this.db.model('ImageViewData')
    }
    async add(imageEntity) {
        const err = []
        const { image_filename, image_filepath, image_mimetype, image_size,textarea,status} = imageEntity
        console.log(image_filename)
        if (_.isUndefined(image_filename) || _.isNull(image_filename)) err.push("image_filename is required in field 'image_filename'")
        if (_.isUndefined(image_filepath) || _.isNull(image_filepath)) err.push("image_filepath is required in field 'image_filepath'")
        if (_.isUndefined(image_mimetype) || _.isNull(image_mimetype)) err.push("image_mimetype is required in field 'image_mimetype'")
        if (_.isUndefined(image_size) || _.isNull(image_size)) err.push("image_size is required in field 'image_size'")
        if (_.isUndefined(textarea) || _.isNull(textarea)) err.push("image_size is required in field 'image_size'")

        // if (_.isUndefined(employee_area) || _.isNull(employee_area)) err.push("employee_area is required in field 'employee_area'")
        if (err.length > 0) return err
        else {
            return await this.model.create({ image_filename, image_filepath, image_mimetype, image_size , textarea,status}, { raw: true })
        }


    }
      async addOut(punchOutEntity) {
        const err = []
        const { employee_email, employee_time, employee_location } = punchOutEntity
        if (_.isUndefined(employee_email) || _.isNull(employee_email)) err.push("employee_email is required in field 'employee_email'")
        if (_.isUndefined(employee_time) || _.isNull(employee_time)) err.push("employee_time is required in field 'employee_time'")
        if (_.isUndefined(employee_location) || _.isNull(employee_location)) err.push("employee_location is required in field 'employee_location'")
        // if (_.isUndefined(employee_area) || _.isNull(employee_area)) err.push("employee_area is required in field 'employee_area'")
        if (err.length > 0) return err
        else {
            return await this.model.create({ employee_email, employee_time, employee_location }, { raw: true })
        }


    }

    async update(id, imageEntity) {
        const err = []
         const {status } = imageEntity
         console.log(status)
    //    if (_.isUndefined(employee_email) || _.isNull(employee_email)) err.push("leave_email is required in field 'leave_email'")
    //     if (_.isUndefined(employee_fromdate) || _.isNull(employee_fromdate)) err.push("leave_fromdate is required in field 'leave_fromdate'")
    //     if (_.isUndefined(employee_todate) || _.isNull(employee_todate)) err.push("leave_todate is required in field 'leave_todate'")
    //     if (_.isUndefined(employee_reason) || _.isNull(employee_reason)) err.push("leave_reason is required in field 'leave_reason'")
    //     if (_.isUndefined(employee_leavetype) || _.isNull(employee_leavetype)) err.push("leave_type is required in field 'leave_type'") 
        if(err.length > 0) return err
        return await this.model.update({status}, { where: { id }, raw: true })

    }

    async delete(id) {
        if(_.isUndefined(id) || _.isNull(id)) return 'Could not delete city without id'
        return await this.model.destroy({ where: { id } })
            
    }

    async getAll() {
        return await this.model.findAll()
    }
    async get(employee_email) {
        if(_.isUndefined(employee_email) || _.isNull(employee_email)) return 'Could not get details without id'
        return await this.model.findAll({ where: { employee_email } })
       
    }
    async check(punchInEntity) {
        // if(_.isUndefined(doctor_name) || _.isNull(doctor_name)) return 'Could not get details without id'
        // return await this.model.findAll({ where: { doctor_name } })
         const err = []
          const { employee_email, employee_time, employee_location } = punchInEntity
      if (_.isUndefined(emoloyee_name) || _.isNull(emoloyee_name)) err.push("emoloyee name is required in field 'emoloyee_name'")
        if (_.isUndefined(emoloyee_age) || _.isNull(emoloyee_age)) err.push("emoloyee_age is required in field 'emoloyee_age'")
        if (_.isUndefined(emoloyee_mobilenumber) || _.isNull(emoloyee_mobilenumber)) err.push("emoloyee_mobilenumber is required in field 'emoloyee_mobilenumber'")
        if (_.isUndefined(emoloyee_email) || _.isNull(emoloyee_email)) err.push("emoloyee_email is required in field 'emoloyee_email'")
        if (_.isUndefined(emoloyee_address) || _.isNull(emoloyee_address)) err.push("emoloyee_address is required in field 'emoloyee_address'")
         if (_.isUndefined(emoloyee_area) || _.isNull(emoloyee_area)) err.push("emoloyee_area is required in field 'emoloyee_area'")   

        if (err.length > 0) return err
        else {
            const v1=this.model.findAll({ where: { emoloyee_name } })
            //if (doctor_name) && doctor_specialization) != this.model.findAll
            // if (doctor_name && doctor_specialization != v1.doctor_name && v1.doctor_specialization){
            //     return 'invalid credintials'
            // }
        return await this.model.findAll({ where: { emoloyee_name } })
// if this.model.findAll({ where: { doctor_name } }) == true{
//     console.log("going to model")
//            return await this.model.findAll({ where: { doctor_name } })
// }
        }
       
    }
}