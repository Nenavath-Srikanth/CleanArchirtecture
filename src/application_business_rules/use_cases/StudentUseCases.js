module.exports = class {
    getAllStudents (Repository)  {
        return Repository.getAll()
    }
    addStudent (studentEntity, Repository) { 
        return Repository.add(studentEntity)
    }
    updateStudent (id, studentEntity, Repository)  {
        return Repository.update(id,studentEntity)
    }
    deleteStudent (id, Repository)  {
        return Repository.delete(id)
    }

}