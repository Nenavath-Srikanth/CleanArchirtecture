const expect = require('chai').expect
const should = require('chai').should()

const StudentModel = require('../src/enterprise_business_rules/entities/Student')
const StudentRepositoryMysql = require('../src/interface_adapters/storage/StudentRepositoryMysql')
const StudentRepository = require('../src/application_business_rules/repositories/StudentRepository')

const mockStudentRepository = new StudentRepository(new StudentRepositoryMysql())

const StudentUseCases = require('../src/application_business_rules/use_cases/StudentUseCases')

const studentUseCases = new StudentUseCases()


describe('Testing Student use cases, ADD Student METHOD', () => {
    it('#should return an object of Student type if valid input are provided', async () => {
        const student = new StudentModel(null, 'KiranKumar', '300')
        const result = await studentUseCases.addStudent(student, mockStudentRepository)
        expect(result).to.be.an('object')
        result.should.have.property('student_name')
        result.should.have.property('student_mark')
        result.should.have.property('id')
    })
    it('#should return an array with error if inputs are not valid', async () => {
        const student = new StudentModel(null, null, null)
        const result = await studentUseCases.addStudent(student, mockStudentRepository)
        expect(result).to.be.an('array')
        expect(result).length(2)
    })
})

describe('Testing Student Use Cases, GET Student METHOD', () => {
    it('#should return an array of students', async () => {
        const result = await studentUseCases.getAllStudents(mockStudentRepository)
        expect(result).to.be.an('array')
    })
})



describe('Testing Student Use Cases, UPDATE STUDENT METHOD', () => {
    it('#should return 1 in array if student is updated succesfully', async () => {
        const student = new StudentModel(null, 'dharshini', '400')
        const seqStudent = await studentUseCases.addStudent(student, mockStudentRepository)
        const updateStudent = new StudentModel(seqStudent.id, 'Sowjanya', '200')
        const result = await studentUseCases.updateStudent(seqStudent.id, updateStudent, mockStudentRepository)
        expect(result).to.be.an('array')
        expect(result[0]).to.equal(1)
    })
    it('#should return 0 in array if student id is not valid', async () => {
        const updateStudent = new StudentModel(1000, 'Ranchi', '120')
        const result = await studentUseCases.updateStudent(1000, updateStudent, mockStudentRepository)
        expect(result).to.be.an('array')
        expect(result[0]).to.equal(0)
    })
    it('#should return with array if the input is not valid', async () => {
        const result = await studentUseCases.updateStudent(1, { student_name: null, student_mark: null }, mockStudentRepository)
        expect(result).to.be.an('array')
        expect(result).length(2)
        const result2 = await studentUseCases.updateStudent(null, { student_name: null, student_mark: null }, mockStudentRepository)
        expect(result2).to.be.an('array')
        expect(result2).length(3)
    })

})

describe('Testing Student use cases, DELETE STUDENT METHOD', () => {
    it('#should delete the student if valid id is provided and return one', async () => {
        const student = new StudentModel(null, 'alwar', '100')
        const newStudent = await studentUseCases.addStudent(student, mockStudentRepository)
        const result = await studentUseCases.deleteStudent(newStudent.id, mockStudentRepository)
        expect(result).to.equal(1)
    })
    it('#should return error message if the id is null or undefinded', async () => {
        const result = await studentUseCases.deleteStudent(null, mockStudentRepository)
        result.should.be.a('string')  
    })
    it('#should return zero if invalid id is provided', async () => {
        const result = await studentUseCases.deleteStudent(5000, mockStudentRepository)
        expect(result).to.equal(0)
    })
})