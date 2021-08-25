const Sequelize = require('sequelize')

const studentModel = require('./models/Student')
const doctorModel = require('./models/Doctor')

const patientModel = require('./models/Patient')
const employeeModel = require('./models/Employee')
const imageuploadModel = require('./models/ImageUploadQ')
const imageModel = require("./models/ImageUpload");
const devpageModel = require("./models/DevPage");
const mailModel = require('./models/Mail')
const userModel = require('./models/User')









const sequelize = new Sequelize('testdb', 'postgres', 'root@123', {
    host: '127.0.0.1',
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

// model definition

const Student = studentModel(sequelize,Sequelize)
const Patient = patientModel(sequelize,Sequelize)

const Doctor = doctorModel(sequelize,Sequelize)
const Employee = employeeModel(sequelize,Sequelize)
const ImageUpload = imageuploadModel(sequelize,Sequelize)
const ImageData = imageModel(sequelize, Sequelize);
const DevPage = devpageModel(sequelize, Sequelize);
const Mail = mailModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);










// Model RelationShip

module.exports = sequelize