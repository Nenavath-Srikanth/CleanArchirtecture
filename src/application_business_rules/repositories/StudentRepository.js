module.exports = class{
    constructor(repository){
        this.repository = repository
    }

    // add a new city
    add(studentEntity){
        return this.repository.add(studentEntity)
    }

    // update existing city
    update(id,studentEntity){
        return this.repository.update(id, studentEntity)
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