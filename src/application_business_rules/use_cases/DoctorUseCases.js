module.exports = class {
    getAllDoctors (Repository)  {
        return Repository.getAll()
    }
    addDoctor (doctorEntity, Repository) { 
        return Repository.add(doctorEntity)
    }
    updateDoctor (id, doctorEntity, Repository)  {
        return Repository.update(id,doctorEntity)
    }
    deleteDoctor (id, Repository)  { // delete doctor
        return Repository.delete(id)
    }
getDoctor (id,Repository) {
    return Repository.getDoctor(id)
}
}