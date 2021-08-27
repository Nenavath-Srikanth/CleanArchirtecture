module.exports = class{
    constructor(repository){
        this.repository = repository
    }

    // add a new city
    add(mailEntity){
        return this.repository.add(mailEntity)
    }

    // update existing city
    update(id,mailEntity){
        return this.repository.update(id, mailEntity)
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