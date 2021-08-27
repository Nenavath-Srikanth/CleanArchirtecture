const router = require('express').Router()
const _ = require('lodash')
const EmployeeSerializer = require('../serializer/EmployeeSerializer')

const EmployeeUseCases = require('../../application_business_rules/use_cases/EmployeeUseCases')
const EmployeeRepositoryMyql = require('../storage/EmployeeRepositoryMysql')
const EmployeeRepository = require('../../application_business_rules/repositories/EmployeeRepository')


// initializing city repository 
const employeeRepository = new EmployeeRepository(new EmployeeRepositoryMyql())
const employeeUseCases = new EmployeeUseCases()

router.post('/', async (req, res) => {
    // inputs
    const { name,age, salary } = req.body
   
    // treatment
    const result = await employeeUseCases.addEmployee({ name,age,salary }, employeeRepository)

    // output
    if (_.isArray(result)) res.json({ status: 'failed', message: 'error occured', error: result })
    else {
        const employeeSerializer = new EmployeeSerializer()
        res.status(201).json({
            status: 'success',
            message: 'Employee created successfully',
            employee: employeeSerializer.serialize(result)
        })
    }
})


router.put('/update_employee', async (req, res) => {
    console.log("step1")
    // input
    const { id, name,age, spelization } = req.body

    // treatment
    const result = await employeeUseCases.updateEmployee(id, { name,age, spelization }, employeeRepository)
    // output
    if (result[0] == 0) res.json({ status: 'failed', message: 'failed to update Employee', error: 'could not find the employee with the id given' })
    if (result[0] == 1) res.json({ status: 'success', message: 'employee updated successfully' })
    res.json({ status: 'Failed', message: 'error occured', error: result })

})

router.get('/', async (req, res) => {
    // treatment
    const result = await employeeUseCases.getAllEmployee(employeeRepository)
    // output
    if (result.length < 1) res.json({ status: 'success', message: 'There are no employees in the database' })
    else {
        const employeeSerializer = new EmployeeSerializer()
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
    const result = await employeeUseCases.deleteEmployee(id, employeeRepository)
    // output
    if (_.isString(result)) res.json({ status: 'Failed', message: 'error occured', error: result })
    if (result == 0) res.json({ status: 'Failed', message: 'Could not find the employee with given Id' })
    else res.json({ status: 'success', message: 'employee deleted successfully' })
})


module.exports = router