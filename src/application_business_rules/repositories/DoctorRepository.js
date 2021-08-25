module.exports = class{
    constructor(repository){
        this.repository = repository
    }

    // add a new city
    add(doctorEntity){
        return this.repository.add(doctorEntity)
    }

    // update existing city
    update(id,doctorEntity){
        return this.repository.update(id, doctorEntity)
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