module.exports = class {
    getAllEmployee (Repository)  {
        return Repository.getAll()
    }
    addEmployee (employeeEntity, Repository) { 
        return Repository.add(employeeEntity)
    }
    updateEmployee (id, employeeEntity, Repository)  {
        return Repository.update(id,employeeEntity)
    }
    deleteEmployee (id, Repository)  { // delete employee
        return Repository.delete(id)
    }
getEmployee (id,Repository) {
    return Repository.getEmployee(id)
}
}