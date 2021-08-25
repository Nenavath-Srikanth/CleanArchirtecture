const router = require('express').Router()
const _ = require('lodash')
const StudentSerializer = require('../serializer/StudentSerializer')

const StudentUseCases = require('../../application_business_rules/use_cases/StudentUseCases')
const StudentRepositoryMyql = require('../storage/StudentRepositoryMysql')
const StudentRepository = require('../../application_business_rules/repositories/StudentRepository')


// initializing city repository 
const studentRepository = new StudentRepository(new StudentRepositoryMyql())
const studentUseCases = new StudentUseCases()

router.post('/', async (req, res) => {
    // inputs
    const { student_name, student_mark } = req.body
   
    // treatment
    const result = await studentUseCases.addStudent({ student_name, student_mark }, studentRepository)

    // output
    if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
    else {
        const studentSerializer = new StudentSerializer()
        res.status(201).json({
            status: 'success',
            message: 'Student created successfully',
            student: studentSerializer.serialize(result)
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

router.get('/', async (req, res) => {
    // treatment
    const result = await studentUseCases.getAllStudents(studentRepository)
    // output
    if (result.length < 1) res.json({ status: 'success', message: 'There are no students in the database' })
    else {
        const studentSerializer = new StudentSerializer()
        res.json({
            status: 'success',
            message: 'student found',
            result: studentSerializer.serialize(result)
        })
    }
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