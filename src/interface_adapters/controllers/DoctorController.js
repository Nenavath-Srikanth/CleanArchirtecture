const router = require('express').Router()
const _ = require('lodash')
const DoctorSerializer = require('../serializer/DoctorSerializer')

const DoctorUseCases = require('../../application_business_rules/use_cases/DoctorUseCases')
const DoctorRepositoryMyql = require('../storage/DoctorRepositoryMysql')
const DoctorRepository = require('../../application_business_rules/repositories/DoctorRepository')


// initializing city repository 
const doctorRepository = new DoctorRepository(new DoctorRepositoryMyql())
const doctorUseCases = new DoctorUseCases()

router.post('/', async (req, res) => {
    // inputs
    const { name,age, spelization } = req.body
   
    // treatment
    const result = await doctorUseCases.addDoctor({ name,age,spelization }, doctorRepository)

    // output
    if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
    else {
        const doctorSerializer = new DoctorSerializer()
        res.status(201).json({
            status: 'success',
            message: 'Doctor created successfully',
            doctor: doctorSerializer.serialize(result)
        })
    }
})


router.put('/updatedoctor', async (req, res) => {
    console.log("step1")
    // input
    const { id, name,age, spelization } = req.body

    // treatment
    const result = await doctorUseCases.updateDoctor(id, { name,age, spelization }, doctorRepository)
    // output
    if (result[0] == 0) res.json({ status: 'failed', message: 'failed to update Doctor', error: 'could not find the doctor with the id given' })
    if (result[0] == 1) res.json({ status: 'success', message: 'doctor updated successfully' })
    res.json({ status: 'Failed', message: 'error occured', error: result })

})

router.get('/', async (req, res) => {
    // treatment
    const result = await doctorUseCases.getAllDoctors(doctorRepository)
    // output
    if (result.length < 1) res.json({ status: 'success', message: 'There are no doctors in the database' })
    else {
        const doctorSerializer = new DoctorSerializer()
        res.json({
            status: 'success',
            message: 'doctor found',
            result: doctorSerializer.serialize(result)
        })
    }
})

router.delete('/', async (req, res) => {
    // input
    const { id } = req.body

    // treatment 
    const result = await doctorUseCases.deleteDoctor(id, doctorRepository)
    // output
    if (_.isString(result)) res.json({ status: 'Failed', message: 'error occured', error: result })
    if (result == 0) res.json({ status: 'Failed', message: 'Could not find the doctor with given Id' })
    else res.json({ status: 'success', message: 'doctor deleted successfully' })
})


module.exports = router