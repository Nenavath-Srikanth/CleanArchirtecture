module.exports = class{
    constructor(repository){
        this.repository = repository
    }

    // add a new employee
    add(employeeEntity){
        return this.repository.add(employeeEntity)
    }

    // update existing employee
    update(id,employeeEntity){
        return this.repository.update(id, employeeEntity)
    }

    // delete existing employee
    delete(id){
        return this.repository.delete(id)
    }

    // get all cities
    getAll(){
        return this.repository.getAll()
    }
}