const router = require('express').Router()
const _ = require('lodash')
const PatientSerializer = require('../serializer/PatientSerializer')

const PatientUseCases = require('../../application_business_rules/use_cases/PatientUseCases')
const PatientRepositoryMyql = require('../storage/PatientRepositoryMysql')
const PatientRepository = require('../../application_business_rules/repositories/PatientRepository')


// initializing city repository 
const patientRepository = new PatientRepository(new PatientRepositoryMyql())
const patientUseCases = new PatientUseCases()

router.post('/', async (req, res) => {
    // inputs
    const { name,age,height,weight } = req.body
   
    // treatment
    const result = await patientUseCases.addPatient({ name,age,height,weight }, patientRepository)

    // output
    if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
    else {
        const patientSerializer = new PatientSerializer()
        res.status(201).json({
            status: 'success',
            message: 'patient created successfully',
            student: patientSerializer.serialize(result)
        })
    }
})





router.get('/', async (req, res) => {
    // treatment
    const result = await patientUseCases.getAllPatients(patientRepository)
    // output
    if (result.length < 1) res.json({ status: 'success', message: 'There are no patients in the database' })
    else {
        const patientSerializer = new PatientSerializer()
        res.json({
            status: 'success',
            message: 'patients found',
            result: patientSerializer.serialize(result)
        })
    }
})


router.put('/', async (req, res) => {
    // input
    const { id, student_name, student_mark } = req.body

    // treatment
    const result = await studentUseCases.updateStudent(id, { student_name, student_mark }, studentRepository)
    // output
    if (result[0] == 0) res.json({ status: 'failed', message: 'failed to update Student', error: 'could not find the student with the id given' })
    if (result[0] == 1) res.json({ status: 'success', message: 'student updated successfully' })
    res.json({ status: 'Failed', message: 'error occured', error: result })

})


router.delete('/', async (req, res) => {
    // input
    const { id } = req.body

    // treatment 
    const result = await studentUseCases.deleteStudent(id, studentRepository)
    // output
    if (_.isString(result)) res.json({ status: 'Failed', message: 'error occured', error: result })
    if (result == 0) res.json({ status: 'Failed', message: 'Could not find the student with given Id' })
    else res.json({ status: 'success', message: 'student deleted successfully' })
})


module.exports = router