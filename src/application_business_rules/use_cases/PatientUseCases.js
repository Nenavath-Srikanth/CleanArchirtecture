module.exports = class {
    getAllPatients (Repository)  {
        return Repository.getAll()
    }
    addPatient (patientEntity, Repository) { 
        return Repository.add(patientEntity)
    }
    updatePatient (id, patientEntity, Repository)  {
        return Repository.update(id,patientEntity)
    }
    deletePatient (id, Repository)  { // delete doctor
        return Repository.delete(id)
    }
getPatient (id,Repository) {
    return Repository.getPatient(id)
}
}