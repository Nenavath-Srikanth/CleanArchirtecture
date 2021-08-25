module.exports = class{
    constructor(repository){
        this.repository = repository
    }

    // add a new city
    add(userEntity){
        return this.repository.add(userEntity)
    }

    // update existing city
    update(id,userEntity){
        return this.repository.update(id, userEntity)
    }

    // delete existing city
    delete(id){
        return this.repository.delete(id)
    }

    // get all cities
    getAll(){
        return this.repository.getAll()
    }
    findOne(userEntity){
        return this.repository.findOne(userEntity)

    }
}