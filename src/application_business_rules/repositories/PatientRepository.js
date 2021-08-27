module.exports = class{
    constructor(repository){
        this.repository = repository
    }

    // add a new city
    add(patientEntity){
        return this.repository.add(patientEntity)
    }

    // update existing city
    update(id,patientEntity){
        return this.repository.update(id, patientEntity)
    }

    // delete existing city
    delete(id){
        return this.repository.delete(id)
    }

    // get all cities
    getAll(){
        return this.repository.getAll()
    }
}